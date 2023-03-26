//package DabuOps.tikkle.oauth.service;
//
//import DabuOps.tikkle.member.entity.Member;
//import DabuOps.tikkle.member.repository.MemberRepository;
//import DabuOps.tikkle.oauth.dto.UserInfo;
//import com.google.gson.Gson;
//import com.google.gson.JsonObject;
//import com.google.gson.JsonParser;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.nio.charset.StandardCharsets;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//@Transactional
//public class OAuthService extends DefaultOAuth2UserService {
//    private final MemberRepository memberRepository;
//
//    /*
//    * Login 과정
//    * Client -> OAuth2 Server 로그인 요청 (프론트)
//    * OAuth2 Server -> Client로 accessToken 발급 (프론트)
//    * Client에 있는 accessToken을 accessTokenDto에 저장 (Contorller에서 RequestBody로 받아오기)
//    * accessToken validate (validate())
//    * accessToken validate 완료시 UserInfo 받아오기 (getMemberProfile())
//    * UserInfo 확인 후 첫 로그인이면 회원가입처리, 아니면 로그인 (getMemberProfile())
//    * return으로 UserInfo 반환
//     */
//    public Object login(String accessToken) throws IOException {
//
//        HttpStatus status = validate(accessToken);
//        Member member = getMemberProfile(accessToken);
//
//        if (status == HttpStatus.UNAUTHORIZED) {
//            return status;
//        } else {
//            return member;
//        }
//    }
//
//    /*
//    * Google Server에서 accessToken validate하는 로직
//    * https://www.googleapis.com/oauth2/v2/tokeninfo?access_token=
//     */
//    public HttpStatus validate(String accessToken) throws IOException {
//        //아래의 url은 Google OAuth 2.0 access token의 유효성을 검증하고 토큰의 정보를 반환하는 데 사용
//        URL url = new URL("https://oauth2.googleapis.com/tokeninfo?access_token=" + accessToken);
//
//        //JSON 형식으로 Http 응답 읽기
//        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//        connection.setRequestMethod("GET");
//        connection.setRequestProperty("Accept", "application/json");
//
//        //Http 요청 후 response code값 확인
//        int responseCode = connection.getResponseCode();
//        if (responseCode == 200) {
//            try (InputStreamReader inputStreamReader = new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8)) {
//                //Google Server에서 validation 완료 후 response data가 넘어오는 부분
//                JsonObject jsonObject = JsonParser.parseReader(inputStreamReader).getAsJsonObject();
//                //response data에서 아래의 내용이 있으면 getMemberProfile에 validation한 access token 보내기
//                if (jsonObject.has("aud") && jsonObject.has("sub") && jsonObject.has("scope")) {
//                    getMemberProfile(accessToken);
//                    return HttpStatus.OK;
//                }
//            }
//        }
//        return HttpStatus.UNAUTHORIZED;
//    }
//
//    /*
//    * UserInfo 받아오기
//    * 유저 정보 확인 후 있으면 로그인 없으면 회원가입(UserInfo -> MemberRepository에 저장
//     */
//    private Member getMemberProfile(String accessToken) throws IOException {
//        //아래의 주소는 access token을 사용하여 사용자의 정보를 가져오는 데 사용
//        URL url = new URL("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + accessToken);
//
//        try (InputStreamReader inputStreamReader = new InputStreamReader(url.openStream(), StandardCharsets.UTF_8)) {
//            Gson gson = new Gson();
//            UserInfo userInfo = gson.fromJson(inputStreamReader, UserInfo.class);
//
//            String email = userInfo.getEmail();
//            String name = userInfo.getName();
//            String picture = userInfo.getPicture();
//
//            Member member = memberRepository.findByEmail(email);
//
//            if (member == null) {
//                Member newMember = new Member();
//                newMember.setEmail(email);
//                newMember.setName(name);
//                newMember.setPicture(picture);
//                memberRepository.save(newMember);
//                return newMember;
//            } else {
//                return  member;
//            }
//        }
//    }
//}