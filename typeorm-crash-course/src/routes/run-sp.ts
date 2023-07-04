import express from "express";
import { Transaction } from "src/entities/Transaction";
import { TransactionResult } from "src/entities/TransactionResult";
import { getManager } from "typeorm";

const router = express.Router();

router.get("/api/client/:clientId/sp", async(req,res) => {
    const { clientId } = req.params;
    const query = `select first_name as firstName, last_name as lastName, email, balance, type, amount, created_at as createdAt from get_all_transactions(${clientId})`;
    try{
        let result = await getManager().query<TransactionResult[]>(query);
        for(let i =0 ; i < result.length;i++){
            console.log(`Transaction Amount:${result[i].amount}.`);
        }
        return res.json(result);
    }catch{
        console.log('Error');
        return res.send('Error!!');
    }

});


export {
    router as runSpRouter
}