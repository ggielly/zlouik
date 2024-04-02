function updatePrimeMontant() {
    const primeMontant01 = document.getElementById("prime_montant_01").value;
    document.getElementById("tns_ir_cell3_1").innerHTML = primeMontant01 + " €";
    
    // Affichage d'informations supplémentaires
    // const montantTotal = primeMontant01 * 1.2; // TVA 20%
    // document.getElementById("montant_total").innerHTML = montantTotal + " €";
}

