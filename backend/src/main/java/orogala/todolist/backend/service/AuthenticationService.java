package orogala.todolist.backend.service;

import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import orogala.todolist.backend.model.LoginResponse;
import orogala.todolist.backend.model.Task;
import orogala.todolist.backend.model.TodoUser;
import orogala.todolist.backend.repository.UserRepository;

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
        String encodedPassword = passwordEncoder.encode(password);
        userRepository.save(new TodoUser(0, email, encodedPassword));
        return loginUser(email, password);
    }

    public LoginResponse loginUser(String email, String password) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            String token = tokenService.generateJwt(auth);

            Optional<TodoUser> userData = userRepository.findByEmail(email);

            if (userData.isPresent()) {
                return new LoginResponse(userData.get(), token);
            }
            return new LoginResponse(null, "");

        } catch(AuthenticationException e) {
            return new LoginResponse(null, "");
        }
    }
}
