import express from "express";
import { Transaction, TransactionTypes } from "../entities/Transaction";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async(req,res) => {

    const { clientId } = req.params;
    
    const { type, amount } = req.body;

    const client = await Client.findOne({
            where: {
                id:  parseInt(clientId)
            }
        }   
    );

    if (!client) {
        return res.json({
            msg: 'client not found',
        });
    }
    
    const transaction = await Transaction.create({
        amount,
        type,
        client,
    });

    await transaction.save();
    console.log(typeof(client.balance));
    console.log(JSON.stringify(client));
	if (type === TransactionTypes.DEPOSIT) {
		client.balance = client.balance + parseFloat(amount);
		
	} else if (
		type === TransactionTypes.WITHDRAW
	) {
		client.balance = client.balance - parseFloat(amount);
	}
    //client.transactions.push(transaction);

	await client.save();

	return res.json(client);


});


export {
    router as createTransactionRouter
}