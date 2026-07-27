export const TOOL_DISCLAIMER = 'Educational estimate. Actual terms, calculations, and outcomes may differ.';
export const MAX_MONTHS = 1200;

export function numberValue(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function clamp(value, minimum = 0, maximum = Number.MAX_SAFE_INTEGER) {
  return Math.min(maximum, Math.max(minimum, numberValue(value)));
}

export function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(numberValue(value));
}

export function paymentForLoan(principal, annualRate, months) {
  const amount = clamp(principal);
  const term = Math.max(1, Math.round(clamp(months, 1, MAX_MONTHS)));
  const monthlyRate = clamp(annualRate, 0, 1000) / 1200;
  if (!monthlyRate) return amount / term;
  return amount * monthlyRate / (1 - (1 + monthlyRate) ** -term);
}

export function debtCost({ principal, annualRate, months, fees = 0, feeTreatment = 'financed' }) {
  const cashPrice = clamp(principal);
  const fee = clamp(fees);
  const financed = cashPrice + (feeTreatment === 'financed' ? fee : 0);
  const payment = paymentForLoan(financed, annualRate, months);
  const repayment = payment * Math.max(1, Math.round(clamp(months, 1, MAX_MONTHS)));
  const upfront = feeTreatment === 'upfront' ? fee : 0;
  return { financed, payment, repayment: repayment + upfront, borrowingCost: repayment + upfront - cashPrice, upfront };
}

export function simulateBalance({ balance, annualRate, payment, monthlyCharge = 0, mode = 'fixed', percent = 2, floor = 35, extra = 0 }) {
  let current = clamp(balance);
  const startingBalance = current;
  const rate = clamp(annualRate, 0, 1000) / 1200;
  const fixedPayment = clamp(payment);
  const charge = clamp(monthlyCharge);
  const extraPayment = clamp(extra);
  let interestPaid = 0;
  let paid = 0;
  const points = [{ month: 0, balance: current }];

  for (let month = 1; month <= MAX_MONTHS && current > 0.005; month += 1) {
    current += charge;
    const interest = current * rate;
    current += interest;
    interestPaid += interest;
    const required = mode === 'minimum'
      ? Math.max(current * clamp(percent, 0, 100) / 100, clamp(floor)) + extraPayment
      : fixedPayment;
    const actualPayment = Math.min(current, required);
    if (actualPayment <= interest + charge + 0.005) {
      return { payoff: false, reason: 'The entered payment does not reduce the balance after estimated interest and new charges.', months: null, interestPaid, paid, finalBalance: current, points };
    }
    current = Math.max(0, current - actualPayment);
    paid += actualPayment;
    if (month === 1 || month % 12 === 0 || current === 0) points.push({ month, balance: current });
    if (current === 0) return { payoff: true, months: month, interestPaid, paid, finalBalance: 0, points };
  }
  return { payoff: false, reason: 'The estimate reached the 100-year display limit before payoff.', months: null, interestPaid, paid, finalBalance: current, points, startingBalance };
}

export function utilization(balance, limit) {
  const availableLimit = clamp(limit);
  if (!availableLimit) return { ratio: null, available: 0 };
  return { ratio: clamp(balance) / availableLimit * 100, available: Math.max(0, availableLimit - clamp(balance)) };
}

export function monthlyReserve(target, saved, months) {
  const remaining = Math.max(0, clamp(target) - clamp(saved));
  return { remaining, monthly: remaining / Math.max(1, Math.round(clamp(months, 1, MAX_MONTHS))) };
}

export function monthlyEquivalent(amount, frequency) {
  const value = clamp(amount);
  return ({ weekly: value * 52 / 12, monthly: value, quarterly: value / 3, yearly: value / 12 })[frequency] ?? value;
}

export function sum(values) {
  return values.reduce((total, value) => total + clamp(value), 0);
}

export function futureClaim({ benefit, payment, months, fees = 0 }) {
  const totalClaim = clamp(payment) * Math.max(0, Math.round(clamp(months, 0, MAX_MONTHS))) + clamp(fees);
  return { benefit: clamp(benefit), totalClaim, difference: totalClaim - clamp(benefit) };
}

export function estimatedPayoffDate(months, from = new Date()) {
  if (!Number.isFinite(months) || months < 0) return null;
  const date = new Date(from.getFullYear(), from.getMonth() + Math.round(months), from.getDate());
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
