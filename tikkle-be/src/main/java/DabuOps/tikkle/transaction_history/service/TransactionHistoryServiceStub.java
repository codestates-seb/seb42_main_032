package DabuOps.tikkle.transaction_history.service;

import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member.entity.Member.Gender;
import DabuOps.tikkle.member.entity.Member.MemberState;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import DabuOps.tikkle.transaction_history.entity.TransactionHistory.InoutType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
@AllArgsConstructor
@Service
public class TransactionHistoryServiceStub implements TransactionHistoryService{
    private TransactionHistory stubTransactionHistory1;
    private TransactionHistory stubTransactionHistory2;

    private MemberCategory stubMemberCategory;
    private Member stubMember;
    private Category category;
    @PostConstruct
    public void init() {
        category = Category.builder()
            .id(1L)
            .name("식비")
            .build();

        stubMember = Member.builder()
            .id(1L)
            .state(MemberState.ACTIVE)
            .name("홍길동")
            .initDate(25)
            .payDay(25)
            .email("test123@gmail.com")
            .gender(Gender.male)
            .build();

        stubMemberCategory = MemberCategory.builder()
            .id(1L)
            .name("술")
            .category(category)
            .member(stubMember)
            .build();

        stubTransactionHistory1 = TransactionHistory.builder()
                .id(1L)
                .memberCategory(stubMemberCategory)
                .date(LocalDate.now())
                .time(LocalTime.now())
                .inoutType(InoutType.SPEND)
                .memo("메모1")
                .amount(10000)
                .branchName("GS25")
                .build();

        stubTransactionHistory2 = TransactionHistory.builder()
                .id(2L)
                .memberCategory(stubMemberCategory)
                .date(LocalDate.now())
                .time(LocalTime.now())
                .inoutType(InoutType.SPEND)
                .memo("메모2")
                .amount(20000)
                .branchName("CU")
                .build();
    }

    public TransactionHistory createTransactionHistory(TransactionHistory transactionHistory, Long memberCategoryId) {
        return this.stubTransactionHistory1;
    }

    public TransactionHistory updateTransactionHistory(TransactionHistory transactionHistory, Long transactionHistoryId) {
        return null;
    }

    public TransactionHistory findTransactionHistory(Long transactionHistoryId) {
        return stubTransactionHistory1;
    }

    public List<TransactionHistory> findMonthlyTransactionHistories(int date, Long memberId) {
        return List.of(stubTransactionHistory1, stubTransactionHistory2);
    }

    public void deleteTransactionHistory(Long transactionHistoryId) {

    }
}
