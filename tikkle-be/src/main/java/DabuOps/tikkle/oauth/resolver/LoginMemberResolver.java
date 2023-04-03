//package DabuOps.tikkle.oauth.resolver;
//
//import DabuOps.tikkle.oauth.dto.LogInMemberDto;
//import javax.servlet.http.HttpServletRequest;
//import org.springframework.core.MethodParameter;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.support.WebDataBinderFactory;
//import org.springframework.web.context.request.NativeWebRequest;
//import org.springframework.web.method.support.HandlerMethodArgumentResolver;
//import org.springframework.web.method.support.ModelAndViewContainer;
//
//public class LoginMemberResolver implements HandlerMethodArgumentResolver {
//    @Override
//    public boolean supportsParameter(MethodParameter parameter) {
//        return parameter.getParameterType().equals(LogInMemberDto.class) &&
//            parameter.hasParameterAnnotation(LoginMember.class);
//    }
//
//    @Override
//    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
//        NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
//        //HttpServletRequest httpServletRequest = (HttpServletRequest) webRequest.getNativeRequest();
//
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//
//        if (principal == "anonymousUser" || principal == null) {
//            return null;
//        }
//
//        LogInMemberDto loginMember = (LogInMemberDto) principal;
//
//        return loginMember;
//    }
//}