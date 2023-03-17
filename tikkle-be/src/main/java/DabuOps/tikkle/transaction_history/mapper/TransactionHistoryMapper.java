package DabuOps.tikkle.transaction_history.mapper;

import DabuOps.tikkle.transaction_history.dto.TransactionHistoryDto;
import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TransactionHistoryMapper {

    TransactionHistory transactionHistoryPostDtoToTransactionHistory(TransactionHistoryDto.Post requestBody);

    TransactionHistory transactionHistoryPatchDtoToTransactionHistory(TransactionHistoryDto.Patch requestBody);

    @Mapping(target = "memberCategoryId", source = "memberCategory.id")
    TransactionHistoryDto.Response transactionHistoryToTransactionHistoryResponseDto(TransactionHistory transactionHistory);

    List<TransactionHistoryDto.Response> transactionHistoriesToTransactionHistoryResponseDto(List<TransactionHistory> transactionHistories);
}
