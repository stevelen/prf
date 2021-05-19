package prf.prfwebshop.models;

//import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int item_id;
    private String transaction_date;
    private int price;
    
    public Transaction() {
    }

    public Transaction(int id, int item_id, String transaction_date, int price) {
        this.id = id;
        this.item_id = item_id;
        this.transaction_date = transaction_date;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getItem_id() {
        return item_id;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    public String getTransaction_date() {
        return transaction_date;
    }

    public void setTransaction_date(String transaction_date) {
        this.transaction_date = transaction_date;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Transaction [transaction_date=" + transaction_date + ", id=" + id + ", item_id=" + item_id + ", price=" + price + "]";
    }

    

}
