package DabuOps.tikkle.budget.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BudgetScheduledService {
    private final BudgetService budgetService;


    //@Scheduled(initialDelay = 60000, fixedRate = 120000) // 테스트용 스케줄 : 실행 후 3분 뒤에 갱신
    @Scheduled(cron = "0 0 0 * * ?", zone = "Asia/Seoul") // 매일 자정에 실행된다는 크론 표현식
    public void callInitBudgetMethod() {
        System.out.println("스케줄러 메서드 시작!");
        budgetService.checkInitDate();
    }
}
