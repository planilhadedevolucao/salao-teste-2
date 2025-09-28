  let order = {
            items: [],
            addons: [],
            total: 0
        };

        function selectItem(category, name, price) {
            // Remove previous item from same category
            order.items = order.items.filter(item => item.category !== category);
            
            // Add new item
            order.items.push({ category, name, price });
            
            // Update visual selection
            document.querySelectorAll(`[id^="check-${category}-"]`).forEach(el => {
                el.className = "w-4 h-4 border-2 border-slate-400 rounded-full";
                el.parentElement.parentElement.classList.remove('selected');
            });
            
            const checkElement = document.getElementById(`check-${category}-${name}`);
            checkElement.className = "w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center";
            checkElement.innerHTML = '<svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
            checkElement.parentElement.parentElement.classList.add('selected');
            
            updateOrderSummary();
        }

        function toggleAddon(name, price) {
            const existingIndex = order.addons.findIndex(addon => addon.name === name);
            const button = event.target;
            
            if (existingIndex >= 0) {
                // Remove addon
                order.addons.splice(existingIndex, 1);
                button.classList.remove('addon-selected');
            } else {
                // Add addon
                order.addons.push({ name, price });
                button.classList.add('addon-selected');
            }
            
            updateOrderSummary();
        }

        function updateOrderSummary() {
            const orderItemsDiv = document.getElementById('order-items');
            const totalPriceSpan = document.getElementById('total-price');
            const whatsappBtn = document.getElementById('whatsapp-btn');
            
            if (order.items.length === 0 && order.addons.length === 0) {
                orderItemsDiv.innerHTML = '<p class="text-slate-500 text-center py-8">Selecione itens do cardápio para montar seu pedido</p>';
                totalPriceSpan.textContent = 'R$ 0';
                whatsappBtn.disabled = true;
                whatsappBtn.classList.add('opacity-50', 'cursor-not-allowed');
                whatsappBtn.classList.remove('hover:bg-green-700');
                return;
            }
            
            let html = '';
            let total = 0;
            
            // Add main items
            order.items.forEach(item => {
                html += `
                    <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <div>
                            <p class="font-medium text-slate-800">${item.name}</p>
                            <p class="text-sm text-slate-600 capitalize">${item.category}</p>
                        </div>
                        <span class="font-semibold text-slate-800">R$ ${item.price}</span>
                    </div>
                `;
                total += item.price;
            });
            
            // Add addons
            order.addons.forEach(addon => {
                html += `
                    <div class="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                        <div>
                            <p class="font-medium text-emerald-800">${addon.name}</p>
                            <p class="text-sm text-emerald-600">Adicional</p>
                        </div>
                        <span class="font-semibold text-emerald-800">+R$ ${addon.price}</span>
                    </div>
                `;
                total += addon.price;
            });
            
            orderItemsDiv.innerHTML = html;
            totalPriceSpan.textContent = `R$ ${total}`;
            order.total = total;
            
            // Enable WhatsApp button when there are items
            whatsappBtn.disabled = false;
            whatsappBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            whatsappBtn.classList.add('hover:bg-green-700');
        }

        function sendToWhatsApp() {
            if (order.items.length === 0) return;
            
            let message = ` *Pedido - Nail Designer*\n\n`;
            
            // Add main items
            order.items.forEach(item => {
                message += `• ${item.name} - R$ ${item.price}\n`;
            });
            
            // Add addons
            if (order.addons.length > 0) {
                message += `\n*Adicionais:*\n`;
                order.addons.forEach(addon => {
                    message += `• ${addon.name} - R$ ${addon.price}\n`;
                });
            }
            
            message += `\n *Total: R$ ${order.total}*\n\n`;
            message += `Gostaria de confirmar este pedido. Obrigado! `;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Replace with your restaurant's WhatsApp number (format: 5511999999999)
            const phoneNumber = '5571992561198';
            
            // Open WhatsApp with the message
            const whatsappUrl = `https://wa.me/${71992561198}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }

         const menuToggle = document.querySelector('.menu-toggle');
        const menuLinks = document.querySelector('.menu-links');

        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'active' para exibir/ocultar o menu mobile
            menuLinks.classList.toggle('active');
        });