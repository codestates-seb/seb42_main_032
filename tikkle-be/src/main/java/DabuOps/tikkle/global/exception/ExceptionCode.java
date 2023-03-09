package DabuOps.tikkle.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    CANNOT_CHANGE_CATEGORY_STATUS(400, "Cannot change category status : 이미 예산을 설정해두었습니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}