import { createSelector } from "reselect";
import { ConstMonths } from './../../../utils/constants';

const selectCommissions = state => state.commissions;

export const selectCommissionList = createSelector(
    [selectCommissions],
    (commission) => commission.commissions
);


export const selectCummulatedCommissions = createSelector(
    
    [selectCommissions],
    (commission) =>  addCommission( commission)
   
    ) ;

 export const selectCommissionsPeriod = createSelector(
    
        [selectCommissions],
        (commission) =>  getPeriod(commission.commissions)
       
        ) 






    function addCommission(array){
        var amountCommission=0;
        var amountAir=0;
        var amountTva=0;
        array.commissions.map((item)=> {
            amountCommission=amountCommission+item.cummulCommission;
            amountAir=amountAir+item.taxeAir;
            amountTva=amountTva+item.tva;
        })
        return {
            "amountCommission": amountCommission.toFixed(2),
            "amountAir": amountAir.toFixed(2),
            "amountTva": amountTva.toFixed(2),
        };
    }

    const getPeriod=(commissions) =>{
        if(commissions.length === 1){
            return ConstMonths[ commissions[0].month];
        }
        else if(commissions.length>1)
        {
           if(commissions[0].month ===1 
               || commissions[0].month===2
               ||commissions[0].month===3
               ||commissions[0].month===4
               ||commissions[0].month===5
               ||commissions[0].month===6)
           {
               return "Semestre 1";
           }
           else{
               return "Semestre 2";
           }
        }   
    }  

  