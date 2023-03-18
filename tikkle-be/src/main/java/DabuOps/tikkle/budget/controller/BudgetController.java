package DabuOps.tikkle.budget.controller;

import DabuOps.tikkle.budget.dto.BudgetDto;
import DabuOps.tikkle.budget.entity.Budget;
import DabuOps.tikkle.budget.mapper.BudgetMapper;
import DabuOps.tikkle.budget.service.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/budgets")
public class BudgetController {
    private final String DEFAULT_URL = "/budgets";
    private final BudgetService budgetService;
    private final BudgetMapper mapper;


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


}
