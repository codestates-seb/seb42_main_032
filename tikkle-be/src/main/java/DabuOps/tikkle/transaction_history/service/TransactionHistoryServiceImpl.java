package DabuOps.tikkle.transaction_history.service;

import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.service.MemberCategoryService;
import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import DabuOps.tikkle.transaction_history.repository.TransactionHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TransactionHistoryServiceImpl implements TransactionHistoryService{
    private final TransactionHistoryRepository transactionHistoryRepository;
    private final MemberCategoryService memberCategoryService;
    public TransactionHistory createTransactionHistory(TransactionHistory transactionHistory, Long memberCategoryId) {
        MemberCategory memberCategory = memberCategoryService.findMemberCategory(memberCategoryId);
        transactionHistory.setMemberCategory(memberCategory);

        return transactionHistoryRepository.save(transactionHistory);
    }

    public TransactionHistory updateTransactionHistory(TransactionHistory transactionHistory, Long transactionHistoryId) {
        TransactionHistory updatedTransactionHistory = findTransactionHistory(transactionHistoryId);

        Optional.ofNullable(transactionHistory.getMemberCategory().getId())
                .ifPresent(categoryId -> updatedTransactionHistory.setMemberCategory(memberCategoryService.findMemberCategory(categoryId)));
        Optional.ofNullable(transactionHistory.getDate())
                .ifPresent(date -> updatedTransactionHistory.setDate(date));
        Optional.ofNullable(transactionHistory.getTime())
                .ifPresent(time -> updatedTransactionHistory.setTime(time));
        Optional.ofNullable(transactionHistory.getMemo())
                .ifPresent(memo -> updatedTransactionHistory.setMemo(memo));
        Optional.ofNullable(transactionHistory.getAmount())
                .ifPresent(amount -> updatedTransactionHistory.setAmount(amount));
        Optional.ofNullable(transactionHistory.getBranchName())
                .ifPresent(branchName -> updatedTransactionHistory.setBranchName(branchName));

        return transactionHistoryRepository.save(updatedTransactionHistory);
    }

    public TransactionHistory findTransactionHistory(Long transactionHistoryId) {
        Optional<TransactionHistory> optionalTransactionHistory = transactionHistoryRepository.findById(transactionHistoryId);
        TransactionHistory findTransactionHistory =
                optionalTransactionHistory.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TRANSACTION_HISTORY_NOT_FOUND));
        if(findTransactionHistory.getStatus().equals(TransactionHistory.Status.INACTIVE)) throw new BusinessLogicException(ExceptionCode.TRANSACTION_HISTORY_NOT_FOUND);
        return findTransactionHistory;
    }

    public List<TransactionHistory> findMonthlyTransactionHistories(int month, Long memberId) {
        // TODO: 2023/03/17
        return null;
    }

    public void deleteTransactionHistory (Long transactionHistoryId) {
        TransactionHistory transactionHistory = findTransactionHistory(transactionHistoryId);
        transactionHistory.setStatus(TransactionHistory.Status.INACTIVE);
    }
}
