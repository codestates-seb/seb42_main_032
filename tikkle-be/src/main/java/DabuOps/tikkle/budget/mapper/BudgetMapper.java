package DabuOps.tikkle.budget.mapper;

import DabuOps.tikkle.budget.dto.BudgetDto;
import DabuOps.tikkle.budget.entity.Budget;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BudgetMapper {
    Budget patchDtoToBudget(BudgetDto.Patch requestBody);

    BudgetDto.Response budgetToResponseDto(Budget budget);
}
