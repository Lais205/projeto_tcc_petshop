from app import create_app, db
from app.models import Product

def parse_price(price_str):
    if not price_str:
        return 0.0
    return float(price_str.replace('.', '').replace(',', '.'))

def init_products():
    app = create_app()

    with app.app_context():
        db.drop_all()
        print('Tabelas antigas deletadas.')

        db.create_all()
        print('Tabelas criadas com nova estrutura.')

        products_data = [
            {
                'name': 'Ração Premium Cães Adultos',
                'category': 'Rações',
                'rating': '4.8',
                'price': '151,92',
                'old_price': '189,90',
                'badge': '-20%',
                'image': '/products/produto_01.png',
                'keywords': 'cães cachorro',
                'featured': True,
            },
            {
                'name': 'Osso Fêmur Suíno para Cães',
                'category': 'Petiscos',
                'rating': '4.9',
                'price': '13,99',
                'badge': 'Novo',
                'image': '/products/produto_02.png',
                'keywords': 'cães cachorro',
                'featured': True,
            },
            {
                'name': 'Brinquedo Bola Maluca Spinball',
                'category': 'Brinquedos',
                'rating': '4.5',
                'price': '62,90',
                'image': '/products/produto_03.png',
                'keywords': 'cães cachorro',
                'featured': True,
            },
            {
                'name': 'Shampoo Antipulgas para Cães',
                'category': 'Higiene',
                'rating': '4.7',
                'price': '42,00',
                'old_price': '59,90',
                'badge': '-15%',
                'image': '/products/produto_04.png',
                'keywords': 'cães gatos',
                'featured': True,
            },
            {
                'name': 'Coleira para Cães Honey Zee',
                'category': 'Cães',
                'rating': '4.8',
                'price': '79,00',
                'image': '/products/produto_05.png',
                'keywords': 'cachorro passeio',
                'featured': True,
            },
            {
                'name': 'Arranhador Nau Três Andares',
                'category': 'Gatos',
                'rating': '4.7',
                'price': '1.046,90',
                'image': '/products/produto_06.png',
                'keywords': 'felinos arranhar',
                'featured': True,
            },
            {
                'name': 'Ração Úmida Whiskas Sachê Gatos Adultos Carne, Frango e Salmão',
                'category': 'Rações',
                'rating': '4.9',
                'price': '20,93',
                'image': '/products/produto_07.png',
                'keywords': 'gatos felinos alimentação',
                'featured': True,
            },
            {
                'name': 'Petisco Bifinho Frango 65g',
                'category': 'Petiscos',
                'rating': '4.8',
                'price': '5,70',
                'image': '/products/produto_08.png',
                'keywords': 'cães cachorro recompensa',
                'featured': True,
            },
            {
                'name': 'Mordedor de Corda para Cães',
                'category': 'Brinquedos',
                'rating': '4.6',
                'price': '26,90',
                'image': '/products/produto_09.png',
                'keywords': 'cães cachorro diversão',
                'featured': True,
            },
            {
                'name': 'Areia para Gatos Carecat Perfumada ',
                'category': 'Higiene',
                'rating': '4.7',
                'price': '17,01',
                'image': '/products/produto_10.png',
                'keywords': 'gatos felinos limpeza',
                'featured': False,
            },
            {
                'name': 'Combo Antipulgas Cães Fiprolex 11 a 20kg Único',
                'category': 'Higiene',
                'rating': '4.9',
                'price': '67,90',
                'old_price': '97,50',
                'badge': 'Oferta',
                'image': '/products/produto_11.png',
                'keywords': 'cães gatos proteção',
                'featured': False,
            },
            {
                'name': 'Ração Golden Cães Adultos Raças Pequenas Frango e Abóbora',
                'category': 'Rações',
                'rating': '4.8',
                'price': '65,99',
                'image': '/products/produto_12.png',
                'keywords': 'cães cachorro alimentação',
                'featured': False,
            },
        ]

        additional_products = [
            {'name': 'Ração Guabi Gatos Adultos Salmão e Cevada', 'category': 'Rações', 'rating': '4.7', 'price': '99,99', 'image': '/products/produto_13.png', 'keywords': 'cães filhote', 'featured': True},
            {'name': 'Ração Fresh Meat Cães Médio e Grande Frango', 'category': 'Rações', 'rating': '4.5', 'price': '323,99', 'image': '/products/produto_14.png', 'keywords': 'gatos adultos', 'featured': True},
            {'name': 'Ração Golden Gatos Adultos', 'category': 'Rações', 'rating': '4.6', 'price': '35,00', 'image': '/products/produto_15.png', 'keywords': 'gatos adulto', 'featured': False},
            {'name': 'Ração Premier Nattu Cães Adultos Frango, e Cranberry', 'category': 'Rações', 'rating': '4.4', 'price': '274,99', 'image': '/products/produto_16.png', 'keywords': 'cães idoso', 'featured': True},
            {'name': 'Ração Úmida Joy Patê para Gatos Peixe', 'category': 'Rações', 'rating': '4.8', 'price': '11,99', 'image': '/products/produto_17.png', 'keywords': 'gatos alimentação', 'featured': True},
            {'name': 'Ração Royal Canin Mini Adult Cães Adultos', 'category': 'Rações', 'rating': '4.8', 'price': '109,90', 'old_price': '125,99', 'badge': '-12%', 'image': '/products/produto_18.png', 'keywords': 'cães adulto', 'featured': True},
            {'name': 'Ração Golden Gatos Adultos Castrados Salmão', 'category': 'Rações', 'rating': '4.6', 'price': '95,00', 'image': '/products/produto_19.png', 'keywords': 'gatos castrados', 'featured': True},
            {'name': 'Ração Joy Cães Adultos Frango e Carne', 'category': 'Rações', 'rating': '4.7', 'price': '159,99', 'old_price': '199,99', 'badge': 'Oferta', 'image': '/products/produto_20.png', 'keywords': 'cães natural', 'featured': True},
            {'name': 'Ração Úmida Joy Gatos Adultos Carne ao Molho', 'category': 'Rações', 'rating': '4.9', 'price': '7,50', 'image': '/products/produto_21.png', 'keywords': 'gatos alimentação', 'featured': True},
            {'name': 'Ração Purina One Microbioma equilibrado Cães', 'category': 'Rações', 'rating': '4.5', 'price': '49,49', 'image': '/products/produto_22.png', 'keywords': 'cães economia', 'featured': True},

            {'name': 'Biscoito Pedigree Biscrok para Cães Adultos Multi 1 kg', 'category': 'Petiscos', 'rating': '4.5', 'price': '19,99', 'image': '/products/produto_23.png', 'keywords': 'cães recompensa', 'featured': False},
            {'name': 'Petisco Churu Galinha e Camarão para Gatos 56 g', 'category': 'Petiscos', 'rating': '4.6', 'price': '19,99', 'image': '/products/produto_24.png', 'keywords': 'gatos recompensa', 'featured': False},
            {'name': 'Orelha Natural Bona Pet Osso', 'category': 'Petiscos', 'rating': '4.3', 'price': '7,99', 'image': '/products/produto_25.png', 'keywords': 'cães petisco', 'featured': False},
            {'name': 'Petisco Moído Bilisko Cães Carne 65 g', 'category': 'Petiscos', 'rating': '4.7', 'price': '6,19', 'image': '/products/produto_26.png', 'keywords': 'cães natural', 'featured': False},
            {'name': 'Petisco Dental Fresh Banana e Menta Cães', 'category': 'Petiscos', 'rating': '4.4', 'price': '31,49', 'image': '/products/produto_27.png', 'keywords': 'cães higiene', 'featured': False},
            {'name': 'Petisco Nugget para Gatos Frango Cansei de Ser Gato 40 g', 'category': 'Petiscos', 'rating': '4.8', 'price': '7,99', 'old_price': '28,00', 'badge': '-21%', 'image': '/products/produto_28.png', 'keywords': 'gatos recompensa', 'featured': False},
            {'name': 'Cookies Fórmula Natural Fresh Meat Gatos 40g', 'category': 'Petiscos', 'rating': '4.5', 'price': '15,99', 'image': '/products/produto_29.png', 'keywords': 'gatos natural', 'featured': False},
            {'name': 'Osso Combo Twister para Cães LL Pet 3 unidades', 'category': 'Petiscos', 'rating': '4.6', 'price': '16,99', 'image': '/products/produto_30.png', 'keywords': 'cães recompensa', 'featured': False},
            {'name': 'Petisco Churu Frango para Cães 56 g', 'category': 'Petiscos', 'rating': '4.4', 'price': '19,99', 'old_price': '24,99', 'badge': 'Oferta', 'image': '/products/produto_31.png', 'keywords': 'cães petisco', 'featured': False},
            {'name': 'Petisco Nugget para Gatos Requeijão Cansei de Ser Gato 40 g', 'category': 'Petiscos', 'rating': '4.7', 'price': '8,50', 'image': '/products/produto_32.png', 'keywords': 'gatos recompensa', 'featured': False},

            {'name': 'Pato de Borracha Cães', 'category': 'Brinquedos', 'rating': '4.5', 'price': '55,00', 'image': '/products/produto_33.png', 'keywords': 'cães brinquedo', 'featured': False},
            {'name': 'Brinquedo Corda Pequena Colorida para Cães', 'category': 'Brinquedos', 'rating': '4.6', 'price': '4,50', 'image': '/products/produto_34.png', 'keywords': 'cães brinquedo', 'featured': False},
            {'name': 'Bola de Tênis Squeakair Kong para Cães M', 'category': 'Brinquedos', 'rating': '4.4', 'price': '39,99', 'image': '/products/produto_35.png', 'keywords': 'cães brinquedo', 'featured': False},
            {'name': 'Brinquedo Rato com Catnip para Gatos', 'category': 'Brinquedos', 'rating': '4.7', 'price': '14,99', 'image': '/products/produto_36.png', 'keywords': 'gatos brinquedo', 'featured': False},
            {'name': 'Bolinha com Penas Cat Toy LCM Vermelha Único', 'category': 'Brinquedos', 'rating': '4.5', 'price': '12,00', 'image': '/products/produto_37.png', 'keywords': 'gatos brinquedo', 'featured': False},
            {'name': 'Brinquedo Pelúcia Mini Zoo Castor', 'category': 'Brinquedos', 'rating': '4.6', 'price': '9,99', 'old_price': '25,00', 'badge': '-22%', 'image': '/products/produto_38.png', 'keywords': 'cães brinquedo', 'featured': False},
            {'name': 'Túnel para Gatos Colorido Savana Único', 'category': 'Brinquedos', 'rating': '4.8', 'price': '94,99', 'image': '/products/produto_39.png', 'keywords': 'gatos brinquedo', 'featured': False},
            {'name': 'Petisco Cookies Origem Natural', 'category': 'Brinquedos', 'rating': '4.5', 'price': '11,80', 'image': '/products/produto_40.png', 'keywords': 'cães inteligência', 'featured': False},
            {'name': 'Arranhador de Papelão Furacão Pet Único', 'category': 'Brinquedos', 'rating': '4.4', 'price': '51,92', 'old_price': '59,90', 'badge': 'Oferta', 'image': '/products/produto_41.png', 'keywords': 'gatos arranhar', 'featured': False},
            {'name': 'Brinquedo Pelúcia Halloween Gato com Corda', 'category': 'Brinquedos', 'rating': '4.7', 'price': '16,90', 'image': '/products/produto_42.png', 'keywords': 'gatos brinquedo', 'featured': False},

            {'name': 'Shampoo Neutro Cães e Gatos Sanol 500 ml', 'category': 'Higiene', 'rating': '4.6', 'price': '27,90', 'image': '/products/produto_43.png', 'keywords': 'cães banho', 'featured': False},
            {'name': 'Loção Hydra Pet Spa Senses Bliss Pet Society 120 ml', 'category': 'Higiene', 'rating': '4.5', 'price': '43,90', 'image': '/products/produto_44.png', 'keywords': 'gatos higiene', 'featured': False},
            {'name': 'Kit Escova de Dentes 2 Dedeiras HomePet Único', 'category': 'Higiene', 'rating': '4.4', 'price': '15,00', 'image': '/products/produto_45.png', 'keywords': 'cães gatos higiene', 'featured': False},
            {'name': 'Higienizador Limpa Patas Sem Enxágue MyHug 150ml', 'category': 'Higiene', 'rating': '4.7', 'price': '39,90', 'image': '/products/produto_46.png', 'keywords': 'cães gatos', 'featured': False},
            {'name': 'Lenço Umedecido Cães e Gatos MyHug 50 unidades', 'category': 'Higiene', 'rating': '4.5', 'price': '16,90', 'image': '/products/produto_47.png', 'keywords': 'cães gatos limpeza', 'featured': False},
            {'name': 'Shampoo para Cachorro Pelos Escuros MyHug 500 ml', 'category': 'Higiene', 'rating': '4.8', 'price': '26,90', 'old_price': '55,00', 'badge': '-24%', 'image': '/products/produto_48.png', 'keywords': 'cães banho', 'featured': False},
            {'name': 'Antipulgas Bravecto para Cães 112,5 mg 1 comprimido', 'category': 'Higiene', 'rating': '4.6', 'price': '118,50', 'image': '/products/produto_49.png', 'keywords': 'caes proteção', 'featured': False},
            {'name': 'OtoCare Loção Limpa Orelha para Cães e Gatos 100 ml', 'category': 'Higiene', 'rating': '4.5', 'price': '57,50', 'old_price': '67,99', 'badge': '-15%', 'image': '/products/produto_50.png', 'keywords': 'gatos higiene', 'featured': False},
            {'name': 'Kit Banho Sanol Dog Shampoo, Condicionador e Colônia 500 ml', 'category': 'Higiene', 'rating': '4.7', 'price': '59,90', 'old_price': '85,00', 'badge': 'Oferta', 'image': '/products/produto_51.png', 'keywords': 'cães banho', 'featured': False},
            {'name': 'Perfume Deo Colônia Fêmea Pet Clean 120 ml', 'category': 'Higiene', 'rating': '4.4', 'price': '23,31', 'image': '/products/produto_52.png', 'keywords': 'cães gatos perfume', 'featured': False},

            {'name': 'Camiseta Superbowl Emporium Distripet Vermelha G', 'category': 'Cães', 'rating': '4.6', 'price': '69,90', 'image': '/products/produto_53.png', 'keywords': 'cães casa', 'featured': False},
            {'name': 'Guia Honey para Cães Zee.Dog G', 'category': 'Cães', 'rating': '4.5', 'price': '94,90', 'image': '/products/produto_54.png', 'keywords': 'cães passeio', 'featured': False},
            {'name': 'Fonte de Cerâmica Aqua Clay Basic Amicus 2,5L Bivolt', 'category': 'Cães', 'rating': '4.7', 'price': '85,00', 'image': '/products/produto_55.png', 'keywords': 'cães alimentação', 'featured': False},
            {'name': 'Coleira Cães Nylon Signature Doco Preta G', 'category': 'Cães', 'rating': '4.4', 'price': '39,99', 'image': '/products/produto_56.png', 'keywords': 'cães passeio', 'featured': False},
            {'name': 'Grade Porta Plus Preta Tubline 70cm', 'category': 'Cães', 'rating': '4.5', 'price': '349,90', 'image': '/products/produto_57.png', 'keywords': 'cães casa', 'featured': False},
            {'name': 'Cama Snow para Cães e Gatos Fábrica Pet Azul P', 'category': 'Cães', 'rating': '4.8', 'price': '159,99', 'old_price': '220,00', 'badge': '-18%', 'image': '/products/produto_58.png', 'keywords': 'cães descanso', 'featured': False},
            {'name': 'Caixa de Transporte Panther Plast Pet Azul Nº 2', 'category': 'Cães', 'rating': '4.6', 'price': '73,90', 'image': '/products/produto_59.png', 'keywords': 'cães transporte', 'featured': False},
            {'name': 'Peitoral FlyHarness para Cães Zee.Dog Gotham N° 1', 'category': 'Cães', 'rating': '4.5', 'price': '279,00', 'image': '/products/produto_60.png', 'keywords': 'cães passeio', 'featured': False},
            {'name': 'Ração GranPlus Cães Adultos Ovelha e Arroz ', 'category': 'Cães', 'rating': '4.7', 'price': '206,99', 'old_price': '229,99', 'badge': 'Oferta', 'image': '/products/produto_61.png', 'keywords': 'cães alimentação', 'featured': True},
            {'name': 'Placa de Identificação Osso Cromado Prata MyFamily P', 'category': 'Cães', 'rating': '4.4', 'price': '76,90', 'image': '/products/produto_62.png', 'keywords': 'cães segurança', 'featured': False},

            {'name': 'Caixa de Transporte New Tripper Box Vermelha Nº 01', 'category': 'Gatos', 'rating': '4.6', 'price': '59,99', 'image': '/products/produto_63.png', 'keywords': 'gatos transporte', 'featured': False},
            {'name': 'Fonte para Gatos Fuzz Mármore Cinza 120 ml', 'category': 'Gatos', 'rating': '4.8', 'price': '109,99', 'image': '/products/produto_64.png', 'keywords': 'gatos alimentação', 'featured': False},
            {'name': 'Toca Cama para Gatos Flicks Rosa P', 'category': 'Gatos', 'rating': '4.5', 'price': '219,90', 'image': '/products/produto_65.png', 'keywords': 'gatos descanso', 'featured': False},
            {'name': 'Banheiro para Gato Joy Furacão Pet Preto 5L', 'category': 'Gatos', 'rating': '4.7', 'price': '19,90', 'image': '/products/produto_66.png', 'keywords': 'gatos higiene', 'featured': False},
            {'name': 'Brinquedo Pelúcia Formiguinha Gordinha', 'category': 'Gatos', 'rating': '4.4', 'price': '48,90', 'image': '/products/produto_67.png', 'keywords': 'gatos brinquedo', 'featured': False},
            {'name': 'Toca Cama para Gatos Flicks Bege M', 'category': 'Gatos', 'rating': '4.8', 'price': '289,90', 'old_price': '355,00', 'badge': '-19%', 'image': '/products/produto_68.png', 'keywords': 'gatos descanso', 'featured': False},
            {'name': 'Arranhador Torre Tripla Fábrica Pet Preto Único', 'category': 'Gatos', 'rating': '4.6', 'price': '165,00', 'image': '/products/produto_69.png', 'keywords': 'gatos arranhar', 'featured': False},
            {'name': 'Comedouro Porcelana Marmorado Médio Bege 390 ml', 'category': 'Gatos', 'rating': '4.5', 'price': '39,90', 'image': '/products/produto_70.png', 'keywords': 'gatos alimentação', 'featured': False},
            {'name': 'Kit para Gatos Furação Pet Vermelho Único', 'category': 'Gatos', 'rating': '4.7', 'price': '39,90', 'old_price': '80,00', 'badge': 'Oferta', 'image': '/products/produto_71.png', 'keywords': 'gatos casa', 'featured': False},
            {'name': 'Tapete Higiênico Super Secão Max Slim 90x60cm 10 unidades', 'category': 'Gatos', 'rating': '4.4', 'price': '46,99', 'image': '/products/produto_72.png', 'keywords': 'gatos higiene', 'featured': False},
        ]

        all_products = products_data + additional_products

        for product_data in all_products:
            product_data['price_numeric'] = parse_price(product_data['price'])
            product = Product(**product_data)
            db.session.add(product)

        db.session.commit()
        print(f'{len(all_products)} produtos adicionados ao banco de dados!')

if __name__ == '__main__':
    init_products()
