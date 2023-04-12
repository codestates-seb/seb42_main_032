package DabuOps.tikkle.transaction_history.service;

import DabuOps.tikkle.transaction_history.entity.TransactionHistory;

import java.util.List;

public interface TransactionHistoryService {
    TransactionHistory createTransactionHistory(TransactionHistory transactionHistory, Long categoryId, Long memberId);

    TransactionHistory updateTransactionHistory(TransactionHistory transactionHistory, Long transactionHistoryId);

    TransactionHistory dutchPayModifyTransactionHistory(TransactionHistory transactionHistory, Long transactionHistoryId);

    TransactionHistory findTransactionHistory(Long transactionHistoryId);

    List<List> findMonthlyTransactionHistories(int date, Long memberId);

    void deleteTransactionHistory(Long transactionHistoryId);

    TransactionHistory categorizeTransactionHistory(TransactionHistory transactionHistory, Long memberId);
}
