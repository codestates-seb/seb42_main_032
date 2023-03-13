package DabuOps.tikkle.global.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class MultiResponseDto<T> {
    List<T> data;
}
