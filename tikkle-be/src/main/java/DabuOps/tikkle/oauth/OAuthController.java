package DabuOps.tikkle.oauth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OAuthController {

    @GetMapping("/")
    public String getAuthorizationMessage(){
        return "index";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }
}
