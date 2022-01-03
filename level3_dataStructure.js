/**
 * 請求書発行
 * @param {String} invoiceNumber: // 請求書番号。"UC-"の後に10桁の数字が続くとします。
 * @param {String} invoiceDate: // 請求書が作成された日付
 * @param {String} company: // 会社名
 * @param {String} companyAddress: // 会社の住所
 * @param {String} billToName: // 請求書先の名前
 * @param {String} billToAddress: // 請求書先の住所
 * @param {InvoiceItemNode} invoiceItemHeadNode: // 購入したアイテムのリストの開始 （連結リストの先頭） を表すInvoiceItemNode。抽象オブジェクトで学習したnodeを参照してください。
*/
class Invoice {
    constructor(invoiceNumber, invoiceDate, company, companyAddress, billToName, billToAddress, invoiceItemHeadNode) {
        this.invoiceNumber = invoiceNumber;
        this.invoiceDate = invoiceDate;
        this.company = company;
        this.companyAddress = companyAddress;
        this.billToName = billToName;
        this.billToAddress = billToAddress;
        this.invoiceItemHeadNode = invoiceItemHeadNode;
    }

    // 請求書の支払総額を計算します。InvoiceItemHeadNodeから始まるすべてのリスト項目を反復処理し、数量も考慮して計算する必要があります。Tax inputがtrueに設定されている場合は、合計金額に10%を加算してください。
    amountDue (taxes) { 
        let currentNode = this.invoiceItemHeadNode;
        let total = 0; 

        while (currentNode != null) {
            total += currentNode.product.price * currentNode.quantity;
            currentNode = currentNode.next;
        }

        return taxes ? total * 1.1 : total;
    }

    // 請求書の全項目と数量を出力します。「item :shampoo, price :10, quantity:7」のようにそれぞれのアイテムを出力してください。
    printBuyingItems() {
        console.log("Printing the Item List...");
        let currentNode = this.invoiceItemHeadNode;
        while (currentNode != null) {
            console.log("item :" + currentNode.product.title + ", price :" + currentNode.product.price + ", quantity:" + currentNode.quantity);
            currentNode = currentNode.next;
        }
    }

    // 請求書の全内容を出力します。以下のように出力してください。
    printInvoice() {
        console.log(
            "Invoice\n" +
            "No. : " + this.invoiceNumber + "\n" +
            "INVOICE DATE : " + this.invoiceDate + "\n" +
            "SHIP TO : " + this.company + "\n" +
            "ADDRESS : " + this.companyAddress + "\n" +

            "BILL TO : " + this.billToName + "\n" +
            "ADDRESS : " + this.billToAddress + "\n" 
        );

        let currentNode = this.invoiceItemHeadNode;
        while (currentNode != null) {
            console.log(currentNode.product.title + "($" +currentNode.product.price+")" + "--- " + currentNode.quantity + " pcs. " + "--- AMOUNT: " + currentNode.product.price * currentNode.quantity) ;
            currentNode = currentNode.next;
        }

        console.log(
            "SUBTOTAL : " + this.amountDue(false) + "\n" +
            "TAX : " + (this.amountDue(true) - this.amountDue(false)) + "\n" +
            "TOTAL : " + this.amountDue(true)
        );
    }
}

/**
 * @param {Product} product
 * @param {integer} quantity
 * @param {InvoiceItemNode} next
 */
class InvoiceItemNode {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
        this.next = null;
    }

    // 購入する数量に基づいて、製品の合計価格を計算します。
    getTotalPrice() {
        return this.quantity * this.product.price;
    } 
}
/**
 * @param {string} title
 * @param {integer} price
 */
class Product{
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}

let product1 = new Product ("shampoo", 10);
let product2 = new Product ("conditioner", 5);
let product3 = new Product ("tooth brush", 3);

let firstItem = new InvoiceItemNode(product1, 7);
let secondItem = new InvoiceItemNode(product2, 9);
firstItem.next = secondItem;
let thirdItem = new InvoiceItemNode(product3, 10);
secondItem.next = thirdItem;

let invoice = new Invoice ("UC1234567890", "2020/05/06", "Recursion", "Los Angles", "Steven", "Dallas", firstItem);

invoice.printBuyingItems();
invoice.printInvoice();

console.log(invoice.amountDue(false));
console.log(invoice.amountDue(true));


/**
 * 先頭と末尾に挿入
 * @param {SinglyLinkedListNode} head 
 * @param {integer} data 
 * @return {SinglyLinkedListNode} 
 */
function insertHeadTail(head,data){
    let nodeHead = new SinglyLinkedListNode(data);
    let nodeTail = new SinglyLinkedListNode(data);

    nodeHead.next = head;
    let iterator = nodeHead;
    while (iterator.next != null) {
        iterator = iterator.next;
    }
    iterator.next = nodeTail;

    return nodeHead;
}
class SinglyLinkedListNode{
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}


/**
 * 片方向リストのノードの削除
 * @param {SinglyLinkedListNode} head 
 * @param {integer} n 
 * @return {SinglyLinkedListNode} 
 */
function removeNthNode(head,n){
    // 場合分けを避けるために、ダミーノードを作成して先頭に入れておきます。
    let dummyNode = new SinglyLinkedListNode(0);
    dummyNode.next = head;

    // リストを走査して要素の数を数えます。
    let iterator = head;
    let count = 1;
    while (iterator.next != null) {
        iterator = iterator.next;
        count++;
    }
    // 要素の数よりnが大きい時はそのままheadを返します。
    if (count < n) return head;

    // ダミーノードから始めます。
    iterator = dummyNode;
    let i = 0;
    // 末尾からn番目にiteratorを進めます。
    while (i < count - n) {
        iterator = iterator.next;
        i++;
    }
    // 現在n番目を指しているnextをその次のノードに付け替えます。
    iterator.next = iterator.next.next;
    // ダミーノードの次のノードを返します。
    return dummyNode.next;
}
class SinglyLinkedListNode{
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}