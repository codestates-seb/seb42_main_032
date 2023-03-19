package DabuOps.tikkle.webclient.dto;

import lombok.Data;

@Data
public class AccountTransactionRequestDto {
    private String bank_tran_id;
    private String fintech_use_num;
    private String inquiry_type;
    private String inquiry_base;
    private String from_date;
    private String to_date;
    private String sort_order;
    private String tran_dtime;
}
