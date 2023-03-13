package DabuOps.tikkle.transaction_history.service;

import DabuOps.tikkle.transaction_history.entity.TransactionHistory;

import java.util.List;

public interface TransactionHistoryService {
    TransactionHistory createTransactionHistory(TransactionHistory transactionHistory, Long memberCtagoryId);

    TransactionHistory updateTransactionHistory(TransactionHistory transactionHistory, Long transactionHistoryId);

    TransactionHistory findTransactionHistory(Long transactionHistoryId);

    List<TransactionHistory> findAllTransactionHistories(int month);

    void deleteTransactionHistory(Long transactionHistoryId);
}
