package DabuOps.tikkle.global.utils;

import java.util.List;
import lombok.Getter;

@Getter
public class ResponseListDto<T> {
    private List<T> data;

    public ResponseListDto(List<T> data) {
        this.data = data;
    }
}
