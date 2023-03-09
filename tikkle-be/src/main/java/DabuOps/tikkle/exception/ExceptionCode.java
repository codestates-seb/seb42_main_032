package DabuOps.tikkle.exception;

import lombok.Getter;

public enum ExceptionCode {
    CANNOT_CHANGE_CATEGORY_STATUS(400, "Cannot change category status : 이미 예산을 설정해두었습니다."),
    CATEGORY_NOT_FOUND(404, "Cannot found category : 존재하지 않는 카테고리입니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}