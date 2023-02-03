import { PaymentHistoryAuditor } from './payment-history-auditor.model';

describe('PaymentHistoryAuditor', () => {
  it('should create an instance', () => {
    expect(new PaymentHistoryAuditor(PaymentHistoryAuditor)).toBeTruthy();
  });
});
