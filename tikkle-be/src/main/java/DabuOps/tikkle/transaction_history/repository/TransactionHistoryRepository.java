package DabuOps.tikkle.transaction_history.repository;

import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, Long> {
    List<TransactionHistory> findByMemberCategoryMemberIdAndDateBetweenAndStatusNot(Long memberId, LocalDate startDate, LocalDate endDate, TransactionHistory.Status status);

    List<TransactionHistory> findByMemberCategoryId(Long memberCategoryId);
}
