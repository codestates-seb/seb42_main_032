package DabuOps.tikkle.userauth.mapper;

import DabuOps.tikkle.transaction_history.dto.TransactionHistoryDto;
import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
import DabuOps.tikkle.transaction_history.entity.TransactionHistory.InoutType;
import DabuOps.tikkle.userauth.dto.AccountTransactionDto;
import DabuOps.tikkle.userauth.dto.ModifiedTransactionHistoryDto;
import java.text.DateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import javax.swing.text.DateFormatter;

public class AccountTransactionMapper {

    public TransactionHistoryDto.Post accountTransactionDtoToTransactionHistoryPostDto(
        AccountTransactionDto accountTransactionDto, String bankName) {
        if ( accountTransactionDto == null ) {
            return null;
        }
        TransactionHistoryDto.Post.PostBuilder post = TransactionHistoryDto.Post.builder();

        post.date(stringToDate(accountTransactionDto.getTran_date()));
        post.time(stringToTime(accountTransactionDto.getTran_time()));
        post.inoutType(stringToInoutType(accountTransactionDto.getInout_type()));
        post.memo(accountTransactionDto.getPrinted_content());
        post.amount(Integer.parseInt(accountTransactionDto.getTran_amt()));
        post.branchName(accountTransactionDto.getBranch_name());
        post.bankName(bankName);

        return post.build();
    }

    public ModifiedTransactionHistoryDto accountTransactionDtoToModifiedTransactionHistoryDto(
        AccountTransactionDto accountTransactionDto, String bankName) {
        if ( accountTransactionDto == null ) {
            return null;
        }
        ModifiedTransactionHistoryDto.ModifiedTransactionHistoryDtoBuilder modified
            = ModifiedTransactionHistoryDto.builder();

        modified.date(stringToDate(accountTransactionDto.getTran_date()));
        modified.time(stringToTime(accountTransactionDto.getTran_time()));
        modified.inoutType(stringToInoutType(accountTransactionDto.getInout_type()));
        modified.memo(accountTransactionDto.getPrinted_content());
        modified.amount(Integer.parseInt(accountTransactionDto.getTran_amt()));
        modified.branchName(accountTransactionDto.getBranch_name());
        modified.bankName(bankName);

        return modified.build();
    }

    private LocalDate stringToDate(String date){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate localDate = LocalDate.parse(date,dateTimeFormatter);
        return localDate;
    }
    private LocalTime stringToTime(String time){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HHmmss");
        LocalTime localTime = LocalTime.parse(time,dateTimeFormatter);
        return localTime;
    }

    private TransactionHistory.InoutType stringToInoutType(String inout){
        if(inout.equals("입금"))
             return InoutType.INCOME;
        return InoutType.SPEND;
    }

}
