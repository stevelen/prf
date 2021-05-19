package prf.prfwebshop.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import prf.prfwebshop.models.Transaction;
import prf.prfwebshop.models.TransactionService;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class TransactionController {
    
    TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/")
    public String helloWorld(){
        return "Hello World";
    }

    @PostMapping(path = "/transaction", consumes = "application/json")
    public String newTransaction(@RequestBody prf.prfwebshop.models.Transaction transaction){
        try {
            this.transactionService.addTransaction(transaction);
            return "Success";
        } catch (Exception e) {
            System.out.println(e);
            return "Error during create operation";
        }
    }

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions(){
        try {
            return this.transactionService.getAllTransactions();
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/transaction")
    public Transaction getTransactionByID(@RequestParam int id){
        try {
            return this.transactionService.getTransactionById(id);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

}
