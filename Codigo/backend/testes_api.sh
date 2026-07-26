#!/bin/bash

# ====================================================================
#           TESTES DA API - Arborizacao Inteligente
# ====================================================================

API_URL="http://127.0.0.1:3000"
echo "🧪 Iniciando testes da API em ${API_URL}"
echo "======================================================================"

# Cores para saída
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ====================================================================
# 1. TESTE: Rota inicial (GET /)
# ====================================================================
echo -e "\n${YELLOW}[1] Testando rota inicial${NC}"
echo "GET /"
RESPONSE=$(curl -s -w "\n%{http_code}" $API_URL/)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ Sucesso (200)${NC}"
  echo "Resposta: $BODY"
else
  echo -e "${RED}✗ Falha (${HTTP_CODE})${NC}"
  echo "Resposta: $BODY"
fi

# ====================================================================
# 2. TESTE: Cadastrar usuário (POST /users/cadastro)
# ====================================================================
echo -e "\n${YELLOW}[2] Testando cadastro de usuário${NC}"
echo "POST /users/cadastro"

CADASTRO_DATA=$(cat <<EOF
{
  "nome": "João Silva",
  "email": "joao@test.com",
  "senha": "senha123",
  "cpf": "12345678901",
  "cep": "12345678",
  "estado": "SP",
  "cidade": "São Paulo",
  "data_nascimento": "1990-01-15"
}
EOF
)

echo "Payload:"
echo "$CADASTRO_DATA"

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  -d "$CADASTRO_DATA" \
  $API_URL/users/cadastro)

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "409" ]; then
  echo -e "${GREEN}✓ Sucesso (${HTTP_CODE})${NC}"
  echo "Resposta: $BODY"
else
  echo -e "${RED}✗ Falha (${HTTP_CODE})${NC}"
  echo "Resposta: $BODY"
fi

# ====================================================================
# 3. TESTE: Login (POST /users/login)
# ====================================================================
echo -e "\n${YELLOW}[3] Testando login${NC}"
echo "POST /users/login"

LOGIN_DATA=$(cat <<EOF
{
  "email": "joao@test.com",
  "senha": "senha123"
}
EOF
)

echo "Payload:"
echo "$LOGIN_DATA"

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  -d "$LOGIN_DATA" \
  $API_URL/users/login)

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ Sucesso (${HTTP_CODE})${NC}"
  echo "Resposta: $BODY"
  # Extrair token se existir
  TOKEN=$(echo "$BODY" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
  if [ ! -z "$TOKEN" ]; then
    echo "Token obtido: $TOKEN"
  fi
else
  echo -e "${RED}✗ Falha (${HTTP_CODE})${NC}"
  echo "Resposta: $BODY"
fi

# ====================================================================
# 4. TESTE: Listar usuários (GET /users)
# ====================================================================
echo -e "\n${YELLOW}[4] Testando listagem de usuários${NC}"
echo "GET /users"

RESPONSE=$(curl -s -w "\n%{http_code}" $API_URL/users)

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ Sucesso (${HTTP_CODE})${NC}"
  echo "Resposta: $BODY"
else
  echo -e "${RED}✗ Falha (${HTTP_CODE})${NC}"
  echo "Resposta: $BODY"
fi

# ====================================================================
# 5. TESTE: Listar alertas (GET /alertas)
# ====================================================================
echo -e "\n${YELLOW}[5] Testando listagem de alertas${NC}"
echo "GET /alertas"

RESPONSE=$(curl -s -w "\n%{http_code}" $API_URL/alertas)

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✓ Sucesso (${HTTP_CODE})${NC}"
  echo "Resposta: $BODY"
else
  echo -e "${RED}✗ Falha (${HTTP_CODE})${NC}"
  echo "Resposta: $BODY"
fi

echo -e "\n======================================================================"
echo -e "✅ Testes concluídos\n"
