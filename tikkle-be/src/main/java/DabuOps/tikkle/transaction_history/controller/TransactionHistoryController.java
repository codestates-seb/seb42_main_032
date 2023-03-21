package DabuOps.tikkle.transaction_history.controller;

import DabuOps.tikkle.global.utils.*;
import DabuOps.tikkle.member_category.service.MemberCategoryService;
import DabuOps.tikkle.transaction_history.dto.TransactionHistoryDto;
import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import DabuOps.tikkle.transaction_history.mapper.TransactionHistoryMapper;
import DabuOps.tikkle.transaction_history.repository.TransactionHistoryRepository;
import DabuOps.tikkle.transaction_history.service.TransactionHistoryService;
import DabuOps.tikkle.userauth.dto.AccountTransactionDto;
import DabuOps.tikkle.userauth.mapper.AccountTransactionMapper;
import DabuOps.tikkle.userauth.service.UserAuthService;
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
@RequestMapping("/transaction_histories")
public class TransactionHistoryController {
    private final String DEFAULT_URL = "/transaction_histories";
    private final TransactionHistoryService transactionHistoryService;
    private final TransactionHistoryRepository transactionHistoryRepository;
    private final MemberCategoryService memberCategoryService;
    private final TransactionHistoryMapper mapper;

    private final UserAuthService userAuthService;
    private final AccountTransactionMapper accountTransactionMapper;

    @PostMapping()
    public ResponseEntity postTransactionHistory(@Valid @RequestBody TransactionHistoryDto.Post requestBody) {
        Long memberCategoryId = requestBody.getMemberCategoryId();
        TransactionHistory transactionHistory = mapper.transactionHistoryPostDtoToTransactionHistory(requestBody);
        TransactionHistory createdTransactionHistory = transactionHistoryService.createTransactionHistory(transactionHistory, memberCategoryId);

        URI location = UriCreator.createURIWithoutResourceId(DEFAULT_URL);

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{transaction_history_id}")
    public ResponseEntity patchTransactionHistory(@PathVariable("transaction_history_id") Long transactionHistoryId,
                                                  @Valid @RequestBody TransactionHistoryDto.Patch requestBody) {
        Long memberCategoryId = requestBody.getMemberCategoryId();
        TransactionHistory transactionHistory = mapper.transactionHistoryPatchDtoToTransactionHistory(requestBody);
        transactionHistory.setMemberCategory(memberCategoryService.findMemberCategory(memberCategoryId));
        TransactionHistory updatedTransactionHistory = transactionHistoryService.updateTransactionHistory(transactionHistory, transactionHistoryId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{transaction_history_id}")
    public ResponseEntity getTransactionHistory(@PathVariable("transaction_history_id") Long transactionHistoryId) {
        TransactionHistory transactionHistory = transactionHistoryService.findTransactionHistory(transactionHistoryId);
        TransactionHistoryDto.Response response = mapper.transactionHistoryToTransactionHistoryResponseDto(transactionHistory);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{member_id}/{date}")
    public ResponseEntity getMonthlyTransactionHistories(@PathVariable("member_id") Long memberId,
                                                         @PathVariable("date") int date) {
        List<List> monthlyInfo = transactionHistoryService.findMonthlyTransactionHistories(date, memberId);
        List<TransactionHistory> transactionHistories = monthlyInfo.get(0);
        List dailySummary = monthlyInfo.get(1);
        List<TransactionHistoryDto.Response> responses = mapper.transactionHistoriesToTransactionHistoryResponseDto(transactionHistories);

        return new ResponseEntity<>(new MonthlyTransactionHistoriesDto<>(responses, dailySummary), HttpStatus.OK);
    }

    @DeleteMapping("/{transaction_history_id}")
    public ResponseEntity deleteTransactionHistory(@PathVariable("transaction_history_id") Long transactionHistoryId) {
        transactionHistoryService.deleteTransactionHistory(transactionHistoryId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping()
    public ResponseEntity updateTransactionHistoiesFromOpenApi() {
        List<AccountTransactionDto> accountTransactionDtoList = userAuthService.requestTransactionHistories()
    }
}
