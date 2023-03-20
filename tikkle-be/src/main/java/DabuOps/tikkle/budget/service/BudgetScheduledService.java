package DabuOps.tikkle.budget.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BudgetScheduledService {
    private final BudgetService budgetService;

    //@Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행된다는 크론 표현식
    @Scheduled(fixedRate = 300000)
    public void callInitBudgetMethod() {
        budgetService.checkInitDate();
    }
}
