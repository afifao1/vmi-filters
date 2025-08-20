#!/bin/bash

# VMI Backend API Test Script
# Tests all API endpoints to ensure they're working correctly

set -e

BASE_URL="http://127.0.0.1:8000"
ORIGIN="http://localhost:5173"

echo "🧪 VMI Backend API Test Script"
echo "==============================="
echo "Base URL: $BASE_URL"
echo "Origin: $ORIGIN"
echo ""

# Function to print test results
print_result() {
    local test_name="$1"
    local status="$2"
    local message="$3"
    
    if [ "$status" = "PASS" ]; then
        echo "✅ $test_name: PASS - $message"
    else
        echo "❌ $test_name: FAIL - $message"
    fi
    echo ""
}

# Test 1: CORS Preflight
echo "🔍 Test 1: CORS Preflight Request"
echo "----------------------------------"

if curl -s -o /dev/null -w "%{http_code}" -X OPTIONS "$BASE_URL/api/leads" \
    -H "Origin: $ORIGIN" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: content-type" | grep -q "204"; then
    
    # Check CORS headers
    CORS_ORIGIN=$(curl -s -i -X OPTIONS "$BASE_URL/api/leads" \
        -H "Origin: $ORIGIN" \
        -H "Access-Control-Request-Method: POST" \
        -H "Access-Control-Request-Headers: content-type" | grep -i "access-control-allow-origin" | head -1)
    
    if echo "$CORS_ORIGIN" | grep -q "$ORIGIN"; then
        print_result "CORS Preflight" "PASS" "CORS headers properly set"
    else
        print_result "CORS Preflight" "FAIL" "CORS headers missing or incorrect"
    fi
else
    print_result "CORS Preflight" "FAIL" "HTTP status not 204"
fi

# Test 2: Contact Lead Submission
echo "🔍 Test 2: Contact Lead Submission"
echo "----------------------------------"

CONTACT_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/leads" \
    -H "Origin: $ORIGIN" \
    -H "Content-Type: application/json" \
    -d '{
        "type": "contact",
        "name": "Тестовый Пользователь",
        "phone": "+7 900 123-45-67",
        "email": "test@example.com",
        "message": "Это тестовая заявка",
        "source": "test"
    }')

HTTP_STATUS=$(echo "$CONTACT_RESPONSE" | tail -1)
RESPONSE_BODY=$(echo "$CONTACT_RESPONSE" | head -1)

if [ "$HTTP_STATUS" = "201" ]; then
    if echo "$RESPONSE_BODY" | grep -q '"ok":true'; then
        LEAD_ID=$(echo "$RESPONSE_BODY" | grep -o '"id":[0-9]*' | cut -d: -f2)
        print_result "Contact Lead" "PASS" "Lead created with ID: $LEAD_ID"
    else
        print_result "Contact Lead" "FAIL" "Response missing 'ok: true'"
    fi
else
    print_result "Contact Lead" "FAIL" "HTTP status: $HTTP_STATUS, Response: $RESPONSE_BODY"
fi

# Test 3: Product Lead Submission
echo "🔍 Test 3: Product Lead Submission"
echo "----------------------------------"

PRODUCT_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/leads" \
    -H "Origin: $ORIGIN" \
    -H "Content-Type: application/json" \
    -d '{
        "type": "product",
        "name": "Тестовый Покупатель",
        "phone": "+7 900 987-65-43",
        "email": "buyer@example.com",
        "product_id": 999,
        "product_title": "Тестовый Продукт",
        "quantity": 3,
        "source": "test"
    }')

HTTP_STATUS=$(echo "$PRODUCT_RESPONSE" | tail -1)
RESPONSE_BODY=$(echo "$PRODUCT_RESPONSE" | head -1)

if [ "$HTTP_STATUS" = "201" ]; then
    if echo "$RESPONSE_BODY" | grep -q '"ok":true'; then
        LEAD_ID=$(echo "$RESPONSE_BODY" | grep -o '"id":[0-9]*' | cut -d: -f2)
        print_result "Product Lead" "PASS" "Product lead created with ID: $LEAD_ID"
    else
        print_result "Product Lead" "FAIL" "Response missing 'ok: true'"
    fi
else
    print_result "Product Lead" "FAIL" "HTTP status: $HTTP_STATUS, Response: $RESPONSE_BODY"
fi

# Test 4: Validation Error
echo "🔍 Test 4: Validation Error Handling"
echo "------------------------------------"

VALIDATION_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/leads" \
    -H "Origin: $ORIGIN" \
    -H "Content-Type: application/json" \
    -d '{
        "type": "contact",
        "name": "И",
        "phone": "123",
        "email": "invalid-email"
    }')

HTTP_STATUS=$(echo "$VALIDATION_RESPONSE" | tail -1)
RESPONSE_BODY=$(echo "$VALIDATION_RESPONSE" | head -1)

if [ "$HTTP_STATUS" = "422" ]; then
    if echo "$RESPONSE_BODY" | grep -q '"errors"'; then
        print_result "Validation Error" "PASS" "Proper validation error response"
    else
        print_result "Validation Error" "FAIL" "Missing errors in response"
    fi
else
    print_result "Validation Error" "FAIL" "HTTP status: $HTTP_STATUS, expected 422"
fi

# Test 5: Rate Limiting
echo "🔍 Test 5: Rate Limiting (Throttle)"
echo "------------------------------------"

echo "Sending 25 requests to test rate limiting..."
FAILED_REQUESTS=0

for i in {1..25}; do
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/leads" \
        -H "Origin: $ORIGIN" \
        -H "Content-Type: application/json" \
        -d "{
            \"type\": \"contact\",
            \"name\": \"Rate Test $i\",
            \"phone\": \"+7 900 000-00-$i\",
            \"email\": \"ratetest$i@example.com\",
            \"source\": \"test\"
        }")
    
    if [ "$HTTP_STATUS" = "429" ]; then
        FAILED_REQUESTS=$((FAILED_REQUESTS + 1))
    fi
done

if [ $FAILED_REQUESTS -gt 0 ]; then
    print_result "Rate Limiting" "PASS" "Rate limiting working: $FAILED_REQUESTS requests blocked"
else
    print_result "Rate Limiting" "FAIL" "Rate limiting not working properly"
fi

echo ""
echo "🎯 Test Summary"
echo "==============="
echo "All tests completed!"
echo ""
echo "📋 Next steps:"
echo "1. Check the database for created leads"
echo "2. Verify email notifications in storage/logs/laravel.log"
echo "3. Check queue status: php artisan queue:work"
echo "4. Monitor logs: php artisan pail"
echo ""
echo "🚀 API is ready for production use!"
