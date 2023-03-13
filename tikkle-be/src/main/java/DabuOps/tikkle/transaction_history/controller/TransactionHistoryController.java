package DabuOps.tikkle.transaction_history.controller;

import DabuOps.tikkle.global.utils.UriCreator;
import DabuOps.tikkle.transaction_history.dto.TransactionHistoryDto;
import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import DabuOps.tikkle.transaction_history.mapper.TransactionHistoryMapper;
import DabuOps.tikkle.transaction_history.repository.TransactionHistoryRepository;
import DabuOps.tikkle.transaction_history.service.TransactionHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/transaction_histories")
public class TransactionHistoryController {
    private final String DEFAULT_URL = "/transaction_histories";
    private final TransactionHistoryService transactionHistoryService;
    private final TransactionHistoryRepository transactionHistoryRepository;
    private final TransactionHistoryMapper mapper;

    @PostMapping("/{member_category_id}")
    public ResponseEntity postTransactionHistory(@PathVariable("member_category_id") Long memberCategoryId,
                                                 @Valid @RequestBody TransactionHistoryDto.Post requestBody) {
        TransactionHistory transactionHistory = mapper.transactionHistoryPostDtoToTransactionHistory(requestBody);
        transactionHistoryService.createTransactionHistory(transactionHistory, memberCategoryId);

        URI location = UriCreator.createURI(DEFAULT_URL + "/1", 1L);

        return ResponseEntity.created(location).build();
    }
}
