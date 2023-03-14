package DabuOps.tikkle.transaction_history.service;

import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import DabuOps.tikkle.transaction_history.repository.TransactionHistoryRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class TransactionHistoryServiceImpl /*implements TransactionHistoryService*/{
    private final TransactionHistoryRepository transactionHistoryRepository;

    public List<TransactionHistory> findMonthlyTransactionHistories(int month, Long memberId) {
        // TODO: 2023/03/14
        return null;
    }
}
