from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)
load_dotenv()

WHOIS_API_KEY = os.getenv('WHOIS_API_KEY')
WHOIS_API_URL = 'https://www.whoisxmlapi.com/whoisserver/WhoisService'

def truncate_hostnames(hostnames, max_length=25):
    """Truncate hostnames string to max_length, appending '...' if needed."""
    if not hostnames:
        return ''
    hostname_str = ', '.join(hostnames)
    if len(hostname_str) > max_length:
        return hostname_str[:max_length-3] + '...'
    return hostname_str

def calculate_domain_age(reg_date):
    """Calculate domain age in days from registration date."""
    if not reg_date:
        return None
    try:
        reg_date = datetime.strptime(reg_date.split('T')[0], '%Y-%m-%d')
        today = datetime.now()
        age = (today - reg_date).days
        return age
    except (ValueError, TypeError):
        return None

def format_domain_info(data):
    """Format domain information as per assignment requirements."""
    domain_info = data.get('WhoisRecord', {})
    hostnames = domain_info.get('nameServers', {}).get('hostNames', [])
    return {
        'Domain Name': domain_info.get('domainName', ''),
        'Registrar': domain_info.get('registrarName', ''),
        'Registration Date': domain_info.get('registryData', {}).get('createdDate', ''),
        'Expiration Date': domain_info.get('registryData', {}).get('expiresDate', ''),
        'Estimated Domain Age': calculate_domain_age(domain_info.get('registryData', {}).get('createdDate', '')),
        'Hostnames': truncate_hostnames(hostnames)
    }

def format_contact_info(data):
    """Format contact information as per assignment requirements."""
    domain_info = data.get('WhoisRecord', {})
    registrant = domain_info.get('registrant', {})
    technical = domain_info.get('technicalContact', {})
    administrative = domain_info.get('administrativeContact', {})
    return {
        'Registrant Name': registrant.get('name', ''),
        'Technical Contact Name': technical.get('name', ''),
        'Administrative Contact Name': administrative.get('name', ''),
        'Contact Email': registrant.get('email', '')
    }

@app.route('/api/whois', methods=['POST'])
def whois_lookup():
    """Handle Whois API requests for domain or contact information."""
    data = request.get_json()
    print('Received request:', data)  # Add this for debugging
    domain_name = data.get('domainName')
    data_type = data.get('dataType')

    if not domain_name or not data_type:
        print('Error: Missing domainName or dataType')  # Debug log
        return jsonify({'error': 'Missing domainName or dataType'}), 400

    params = {
        'apiKey': WHOIS_API_KEY,
        'domainName': domain_name,
        'outputFormat': 'JSON'
    }

    try:
        print('Sending Whois API request:', params)  # Debug log
        response = requests.get(WHOIS_API_URL, params=params, timeout=10)
        response.raise_for_status()
        result = response.json()
        print('Whois API response:', result)  # Debug log

        if data_type == 'domain':
            formatted_data = format_domain_info(result)
        elif data_type == 'contact':
            formatted_data = format_contact_info(result)
        else:
            print('Error: Invalid dataType')  # Debug log
            return jsonify({'error': 'Invalid dataType'}), 400

        print('Returning formatted data:', formatted_data)  # Debug log
        return jsonify(formatted_data)

    except requests.RequestException as e:
        print('Whois API error:', str(e))  # Debug log
        return jsonify({'error': f'Failed to fetch Whois data: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)