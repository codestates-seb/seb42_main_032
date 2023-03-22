package DabuOps.tikkle.transaction_history.service;

import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.service.MemberCategoryService;
import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import DabuOps.tikkle.transaction_history.repository.TransactionHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
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
        transactionHistory.setStatus(TransactionHistory.Status.ACTIVE);

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
        if(findTransactionHistory.getStatus().equals(TransactionHistory.Status.INACTIVE))
        {throw new BusinessLogicException(ExceptionCode.TRANSACTION_HISTORY_NOT_FOUND);}
        return findTransactionHistory;
    }

    // 특정 월 거래내역 쭉 뽑아오기 -> 캘린더 뷰 아랫단 정보
    public List<List> findMonthlyTransactionHistories(int date, Long memberId) {
        //date = 6자리 숫자! 202303
        int year = date / 100;
        int month = date - year * 100;

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<TransactionHistory> transactionHistories =
                transactionHistoryRepository.findByMemberCategory_Member_IdAndDateBetweenAndStatusNot(
                memberId, startDate, endDate, TransactionHistory.Status.INACTIVE);

        List dailySummary = findMonthlyTransactionHistoriesSummary(transactionHistories, startDate);

        return List.of(transactionHistories, dailySummary);
    }

    public List<List<Integer>> findMonthlyTransactionHistoriesSummary(List<TransactionHistory> transactionHistories, LocalDate startDate) {
        List<List<Integer>> daily = new ArrayList<>();
        for (int i = 0; i <= LocalDate.now().getDayOfMonth(); i++) {
            daily.add(Arrays.asList(0, 0));
            // daily index = 일
            // daily(i,0) = i일의 수입, daily(i,1) = i일의 지출
        }

        for(int i = 1; i <= transactionHistories.size(); i++) {
            for(TransactionHistory j : transactionHistories) {
                if(i == j.getDate().getDayOfMonth()) {
                    if(j.getInoutType().equals(TransactionHistory.InoutType.INCOME)) daily.get(i).set(0, daily.get(i).get(0) + j.getAmount());
                    else daily.get(i).set(1, daily.get(i).get(1) + j.getAmount());
                }
            }
        }

        return daily;
    }

    public void deleteTransactionHistory (Long transactionHistoryId) {
        TransactionHistory transactionHistory = findTransactionHistory(transactionHistoryId);
        transactionHistory.setStatus(TransactionHistory.Status.INACTIVE);
    }

//    public TransactionHistory getTransactionHistoriesfromOpenApi(TransactionHistory transactionHistory) {
//        String branchName = transactionHistory.getBranchName();
//
//    }
}
