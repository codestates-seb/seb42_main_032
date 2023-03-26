package DabuOps.tikkle.budget.mapper;

import DabuOps.tikkle.budget.dto.BudgetDto;
import DabuOps.tikkle.budget.entity.Budget;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BudgetMapper {
    Budget postDtoToBudget(BudgetDto.Post requestBody);
    Budget patchDtoToBudget(BudgetDto.Patch requestBody);

    @Mapping(target = "memberCategoryId", source = "memberCategory.id")
    BudgetDto.Response budgetToResponseDto(Budget budget);
    List<BudgetDto.Response> budgetsToResponseDto(List<Budget> budgets);
}
