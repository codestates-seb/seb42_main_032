package DabuOps.tikkle.global;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import org.springframework.security.test.context.support.WithSecurityContext;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMemberDetailsSecurityContextFactory.class)
public @interface WithMockCustomMember {
    long first() default 1;

    String second() default "hgd@gmail.com";
}
