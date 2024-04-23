from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin

import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/products')
@cross_origin()
def get_products():

    product_name = request.args.get('product_name')

    base_url = "https://www.flipkart.com/search"
    search_url = f"{base_url}?q={product_name}"
    response = requests.get(search_url)

    soup = BeautifulSoup(response.content, 'html.parser')

    product_titles = []
    product_prices = []
    product_image_urls = []

    product_cards = soup.find_all('div', {'class': '_75nlfW'})

    for card in product_cards:
        title_card = card.find('div', {'class': 'KzDlHZ'})
        if title_card:
            title_text = title_card.text.strip()
            product_titles.append(title_text)

        price = card.find('div', {'class': 'Nx9bqj'})
        if price:
            price_text = price.text.strip()
            product_prices.append(price_text)

        image = card.find('img', {'class': 'DByuf4'})
        if image:
            image_url = image.get('src')
            product_image_urls.append(image_url)

    products = []
    for title, price, image_url in zip(product_titles, product_prices, product_image_urls):
        price = price[1:].replace(",","")

        product_dict = {
            "title": title,
            "price": int(price),
            "image_url": image_url
        }
        products.append(product_dict)
    products.sort( key=lambda x: x["price"])
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True)


