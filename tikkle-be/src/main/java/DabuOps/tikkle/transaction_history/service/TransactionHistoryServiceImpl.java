package DabuOps.tikkle.transaction_history.service;

import DabuOps.tikkle.budget.entity.Budget;
import DabuOps.tikkle.budget.repository.BudgetRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.repository.MemberCategoryRepository;
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
    private final MemberCategoryRepository memberCategoryRepository;
    private final BudgetRepository budgetRepository;

    public TransactionHistory createTransactionHistory(TransactionHistory transactionHistory, Long memberCategoryId) {
        MemberCategory memberCategory = memberCategoryService.findMemberCategory(memberCategoryId);
        transactionHistory.setMemberCategory(memberCategory);
        transactionHistory.setStatus(TransactionHistory.Status.ACTIVE);

        if(transactionHistory.getInoutType().equals(TransactionHistory.InoutType.SPEND)) {
            Budget budget = budgetRepository.findByMemberCategoryIdAndCurrentIsTrue(memberCategoryId);

            budget.setSpend(budget.getSpend() + transactionHistory.getAmount());
            budgetRepository.save(budget);
        }

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
                transactionHistoryRepository.findByMemberCategoryMemberIdAndDateBetweenAndStatusNot(
                memberId, startDate, endDate, TransactionHistory.Status.INACTIVE);

        List dailySummary = findMonthlyTransactionHistoriesSummary(transactionHistories, startDate);

        return List.of(transactionHistories, dailySummary);
    }

    public List<List<Integer>> findMonthlyTransactionHistoriesSummary(List<TransactionHistory> transactionHistories, LocalDate startDate) {
        List<List<Integer>> daily = new ArrayList<>();
        for (int i = 0; i <= LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth()).getDayOfMonth(); i++) {
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

    public TransactionHistory categorizeTransactionHistory(TransactionHistory transactionHistory, Long memberId) {
        String branchName = transactionHistory.getBranchName();
        String stringCategorizeCode = branchName.substring(0,5);
        int categorizeCode = Integer.parseInt(stringCategorizeCode);

        // code : xxxxx
        switch (categorizeCode/1000) {
            case 35 :
                if(categorizeCode/100 == 352) {
                    // 352xx : 주거
                    transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(12L, memberId, MemberCategory.Status.INACTIVE));
                }
                break;

            case 36 :
                if(categorizeCode/10 == 3601) {
                    // 3601x : 주거
                    transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(12L, memberId, MemberCategory.Status.INACTIVE));
                }
                break;

            case 45 :
                // 45xxx : 자동차
                transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(10L, memberId, MemberCategory.Status.INACTIVE));
                break;

            case 47 :
                if(categorizeCode/100 == 476) {
                    if(categorizeCode/10 == 4763) {
                        // 4763x : 운동
                        transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(20L, memberId, MemberCategory.Status.INACTIVE));
                    }
                        // 476xx : 오락
                    else transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(4L, memberId, MemberCategory.Status.INACTIVE));
                }
                else if (categorizeCode/100 == 478) {
                    if (categorizeCode == 47852) {
                        // 47852 : 반려동물
                        transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(18L, memberId, MemberCategory.Status.INACTIVE));
                    }
                    else if (categorizeCode == 47813) {
                        // 47813 : 미용
                        transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(8L, memberId, MemberCategory.Status.INACTIVE));
                    }
                        // 478xx : 쇼핑
                    else transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(1L, memberId, MemberCategory.Status.INACTIVE));
                }
                else if(categorizeCode/100 == 474 || categorizeCode/100 == 479) {
                    // 474xx, 479xx : 쇼핑
                    transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(1L, memberId, MemberCategory.Status.INACTIVE));
                }
                else if(categorizeCode == 47221) {
                    // 47221 : 카페
                    transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(3L, memberId, MemberCategory.Status.INACTIVE));
                }
                    // 47xxx : 생활
                else transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(15L, memberId, MemberCategory.Status.INACTIVE));
                break;

            case 49 :
                    // 49xxx : 대중교통
                transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(11L, memberId, MemberCategory.Status.INACTIVE));
                break;

            case 56 :
                if(categorizeCode/100 == 561) {
                    // 561xx : 식비
                    transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(2L, memberId, MemberCategory.Status.INACTIVE));
                }
                else if(categorizeCode/10 == 5622) {
                    // 5622x : 카페
                    transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(3L, memberId, MemberCategory.Status.INACTIVE));
                }
                else if(categorizeCode/10 == 5621) {
                    // 5621x : 술
                    transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(5L, memberId, MemberCategory.Status.INACTIVE));
                }
                break;

            case 51 :
            case 55 :
                    // 51xxx, 55xxx : 여행
                transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(7L, memberId, MemberCategory.Status.INACTIVE));
                break;

            case 61 :
                if(categorizeCode/100 == 612) {
                    // 612xx : 통신
                    transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(14L, memberId, MemberCategory.Status.INACTIVE));
                }
                break;

            case 64 :
            case 65 :
            case 66 :
                    // 64xxx, 65xxx, 66xxx : 금융
                transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(9L, memberId, MemberCategory.Status.INACTIVE));
                break;

            case 68 :
                    // 68xxx : 주거
                transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(12L, memberId, MemberCategory.Status.INACTIVE));
                break;

            case 73 :
                if(categorizeCode/100 == 731) {
                    // 731xx : 반려동물
                    transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(18L, memberId, MemberCategory.Status.INACTIVE));
                }
                break;

            case 85 :
                    // 85xxx : 교육
                transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(17L, memberId, MemberCategory.Status.INACTIVE));
                break;

            case 86 :
                // 86xxx : 건강
                transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(6L, memberId, MemberCategory.Status.INACTIVE));
                break;

            case 90 :
            case 91 :
                // 90xxx, 91xxx : 문화생활
                transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(19L, memberId, MemberCategory.Status.INACTIVE));
                break;

            case 96 :
                if(categorizeCode/100 == 961) {
                    // 961xx : 미용
                    transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(8L, memberId, MemberCategory.Status.INACTIVE));
                }
                else if(categorizeCode == 96995) {
                    // 96995 : 반려동물
                    transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(18L, memberId, MemberCategory.Status.INACTIVE));
                }
                break;

            case 97 :
                // 97xxx : 자녀/육아
                transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(16L, memberId, MemberCategory.Status.INACTIVE));
                break;

            default :
                // 그 외 : 기타
                transactionHistory.setMemberCategory(memberCategoryRepository.findByCategoryIdAndMemberIdAndStatusNot(21L, memberId, MemberCategory.Status.INACTIVE));
                break;
        }
        if(transactionHistory.getInoutType().equals(TransactionHistory.InoutType.SPEND)) {
            Long memberCategoryId = transactionHistory.getMemberCategory().getId();
            Budget budget = budgetRepository.findByMemberCategoryIdAndCurrentIsTrue(memberCategoryId);

            budget.setSpend(budget.getSpend() + transactionHistory.getAmount());
            budgetRepository.save(budget);
        }

        return transactionHistoryRepository.save(transactionHistory);
    }
}
