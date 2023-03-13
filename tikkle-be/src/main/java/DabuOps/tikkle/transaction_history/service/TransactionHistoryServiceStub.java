package DabuOps.tikkle.transaction_history.service;

import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class TransactionHistoryServiceStub implements TransactionHistoryService{
    private TransactionHistory stubTransactionHistory1;
    private TransactionHistory stubTransactionHistory2;

    @PostConstruct
    public void init() {
        stubTransactionHistory1 = TransactionHistory.builder()
                .id(1L)
                .memberCategoryId(1L)
                .date(LocalDate.now())
                .time(LocalTime.now())
                .inoutType(TransactionHistory.InoutType.SPEND)
                .memo("메모1")
                .amount(10000)
                .branch_name("GS25")
                .build();

        stubTransactionHistory2 = TransactionHistory.builder()
                .id(2L)
                .memberCategoryId(1L)
                .date(LocalDate.now())
                .time(LocalTime.now())
                .inoutType(TransactionHistory.InoutType.SPEND)
                .memo("메모2")
                .amount(20000)
                .branch_name("CU")
                .build();
    }

    public TransactionHistory createTransactionHistory(TransactionHistory transactionHistory, Long memberCategoryId) {
        return null;
    }

    public TransactionHistory updateTransactionHistory(TransactionHistory transactionHistory, Long transactionHistoryId) {
        return null;
    }

    public TransactionHistory findTransactionHistory(Long transactionHistoryId) {
        return stubTransactionHistory1;
    }

    public List<TransactionHistory> findAllTransactionHistories(int month) {
        return List.of(stubTransactionHistory1, stubTransactionHistory2);
    }

    public void deleteTransactionHistory(Long transactionHistoryId) {

    }
}
