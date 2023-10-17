import {CronJob} from "cron";
import dayjs from "dayjs";
import  utc  from "dayjs/plugin/utc";
import {tokenRepository} from "../repositories/token.repository";

dayjs.extend(utc);

const tokensRemover = async  function () {
    // console.log("Cron has been started");
   try {
       const previousMonth = dayjs().utc().subtract(30, 'day');
       // console.log(dayjs().utc(true))
       await tokenRepository.deleteManyByParams({createdAt: {$lte: previousMonth},
       });
   }catch (e) {

   }
};

export const removeOldTokens = new CronJob('* */10 * * * *', tokensRemover)