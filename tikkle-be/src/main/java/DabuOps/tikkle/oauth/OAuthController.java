package DabuOps.tikkle.oauth;

import DabuOps.tikkle.member.service.MemberService;
import javax.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class OAuthController {
    private final HttpSession httpSession;

    @GetMapping("/")
    public String index(){


        return "index";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }
}
