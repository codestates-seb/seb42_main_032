package DabuOps.tikkle.budget.controller;

import DabuOps.tikkle.budget.dto.BudgetDto;
import DabuOps.tikkle.budget.entity.Budget;
import DabuOps.tikkle.budget.mapper.BudgetMapper;
import DabuOps.tikkle.budget.service.BudgetService;
import DabuOps.tikkle.global.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@CrossOrigin
@RequestMapping("/budgets")
public class BudgetController {
    private final String DEFAULT_URL = "/budgets";
    private final BudgetService budgetService;
    private final BudgetMapper mapper;

    @PostMapping
    public ResponseEntity postBudget(@RequestBody BudgetDto.Post requestBody) {
        Budget budget = mapper.postDtoToBudget(requestBody);
        budgetService.createBudget(budget, requestBody.getMemberCategoryId());

        URI location = UriCreator.createURIWithoutResourceId(DEFAULT_URL);

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{budget_id}")
    public ResponseEntity patchBudget(@PathVariable("budget_id") Long budgetId,
                                      @Valid @RequestBody BudgetDto.Patch requestBody) {
        Budget budget = mapper.patchDtoToBudget(requestBody);
        Budget updatedBudget = budgetService.updateBudget(budget, budgetId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{budget_id}")
    public ResponseEntity getBudget(@PathVariable("budget_id") Long budgetId) {
        Budget budget = budgetService.findBudget(budgetId);
        BudgetDto.Response response = mapper.budgetToResponseDto(budget);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/members/{member_id}")
    public ResponseEntity getAllBudgets(@PathVariable("member_id") Long memberId) {
        List<Budget> budgets = budgetService.findAllCurrentBudget(memberId);
        List<BudgetDto.Response> responses = mapper.budgetsToResponseDto(budgets);

        return new ResponseEntity(responses, HttpStatus.OK);
    }

    @DeleteMapping("/{budget_id}")
    public ResponseEntity deleteBudget(@PathVariable("budget_id") Long budgetId) {
        budgetService.deleteBudget(budgetId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
