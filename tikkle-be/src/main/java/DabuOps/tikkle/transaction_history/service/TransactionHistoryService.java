package DabuOps.tikkle.transaction_history.service;

import DabuOps.tikkle.transaction_history.entity.TransactionHistory;

import java.util.List;

public interface TransactionHistoryService {
    TransactionHistory createTransactionHistory(TransactionHistory transactionHistory, Long memberId);

    TransactionHistory updateTransactionHistory(TransactionHistory transactionHistory);

    TransactionHistory findTransactionHistory(Long transactionHistoryId);

    List<TransactionHistory> findAllTransactionHistories(Long memberCategoryId);

    void deleteTransactionHistory(Long transactionHistoryId);
}
