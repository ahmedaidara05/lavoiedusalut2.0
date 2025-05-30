// Configuration Paytech
const PAYTECH_API_KEY = 'f8a077dfe10504fd7f7386f954c2908b6693ca5a859fe8583efc2a187fb6cced';
const PAYTECH_SECRET = '60722af081d51b2f0d4732a2d1699a19a005ca2327aa2665eab4e65dbe4e4332';
const PAYTECH_BASE_URL = 'https://api.paytech.sn';
const TOTAL_PRICE = 2000; // 2000 FCFA pour les 35 chapitres

// Fonction pour afficher la popup d'achat
function showPaymentPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'pay-overlay';
    overlay.innerHTML = `
        <div class="pay-modal">
            <button class="close-pay-modal">×</button>
            <h3>Achetez les chapitres complets</h3>
            <p>Accédez aux 35 chapitres restants (10 à 44) pour seulement 2000 FCFA ! Un guide spirituel complet pour votre cheminement.</p>
            <button class="pay-btn">Acheter maintenant</button>
        </div>
    `;
    document.body.appendChild(overlay);

    // Ajouter les styles CSS dans le <head> pour la popup
    const style = document.createElement('style');
    style.textContent = `
        .pay-overlay {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 2000;
            justify-content: center;
            align-items: center;
        }
        .pay-modal {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            text-align: center;
            position: relative;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .pay-modal h3 {
            color: #2e7d32;
            font-size: 24px;
            margin-bottom: 15px;
        }
        .pay-modal p {
            color: #1a3c34;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        .pay-btn {
            background: linear-gradient(90deg, #2e7d32, #1f5c24);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .pay-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(46, 125, 50, 0.4);
        }
        .close-pay-modal {
            position: absolute;
            top: 10px;
            left: 10px;
            background: none;
            border: none;
            font-size: 20px;
            color: #1a3c34;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Fermer la popup
    overlay.querySelector('.close-pay-modal').addEventListener('click', () => {
        overlay.remove();
    });

    // Redirection vers le paiement
    overlay.querySelector('.pay-btn').addEventListener('click', () => {
        initiatePayment();
    });
}

// Initiation du paiement avec Paytech
function initiatePayment() {
    const paymentData = {
        amount: TOTAL_PRICE * 100, // Montant en centimes (2000 FCFA = 200000 centimes)
        currency: 'XOF',
        description: 'Achat des chapitres 10-44 de La Voie du Salut',
        customer: {
            email: 'user@example.com', // À remplacer par l'email de l'utilisateur connecté si disponible
            name: 'Utilisateur Anonyme'
        },
        callback_url: window.location.origin + '/success', // URL de redirection en cas de succès
        cancel_url: window.location.origin + '/cancel', // URL de redirection en cas d'annulation
        notification_url: window.location.origin + '/ipn' // URL de notification instantanée
    };

    fetch(`${PAYTECH_BASE_URL}/v1/payments/initiate`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${PAYTECH_API_KEY}:${PAYTECH_SECRET}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success' && data.payment_url) {
            window.location.href = data.payment_url; // Redirige vers la page de paiement Paytech
        } else {
            alert('Erreur lors de l\'initialisation du paiement. Veuillez réessayer.');
        }
    })
    .catch(error => {
        console.error('Erreur Paytech:', error);
        alert('Une erreur s\'est produite. Veuillez contacter le support.');
    });
}

// URLs pour Paytech
console.log('URL de notification instantanée (IPN): ' + window.location.origin + '/ipn');
console.log('URL de redirection en cas de succès: ' + window.location.origin + '/success');
console.log('URL de redirection en cas d\'annulation: ' + window.location.origin + '/cancel');

// Exporter la fonction showPaymentPopup pour l'utiliser dans script.js
window.showPaymentPopup = showPaymentPopup;
