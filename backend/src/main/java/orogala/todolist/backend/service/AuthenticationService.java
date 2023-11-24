package orogala.todolist.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import orogala.todolist.backend.model.LoginResponse;
import orogala.todolist.backend.model.TodoUser;
import orogala.todolist.backend.repository.UserRepository;

import java.time.Instant;
import java.util.Optional;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public LoginResponse registerUser(String email, String password) {
        Optional<TodoUser> userData = userRepository.findByEmail(email);
        if (userData.isEmpty()) {
            String encodedPassword = passwordEncoder.encode(password);
            userRepository.save(new TodoUser(0, email, encodedPassword));
            return loginUser(email, password);
        }
        return new LoginResponse("");
    }

    public LoginResponse loginUser(String email, String password) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            String token = tokenService.generateJwt(auth);

            Optional<TodoUser> userData = userRepository.findByEmail(email);

            if (userData.isPresent()) {
                return new LoginResponse(token);
            }
            return new LoginResponse("");

        } catch(AuthenticationException e) {
            return new LoginResponse("");
        }
    }

    public Optional<TodoUser> validateUser() {
        JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) token.getCredentials();
        String email = jwt.getClaims().get("sub").toString();
        if (jwt.getExpiresAt() != null && jwt.getExpiresAt().isAfter(Instant.now()) ) {
            return userRepository.findByEmail(email);
        }
        return Optional.empty();

    }
}
