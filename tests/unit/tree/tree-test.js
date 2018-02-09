function loadXMLDoc(dname) {                      
	var xhttp = new XMLHttpRequest();                      
	xhttp.open("GET", dname, false);
	xhttp.setRequestHeader('Content-Type', 'text/xml');
	xhttp.send('');            
	return xhttp.responseXML;        
}

var results = [{
		Text: 'Food', __expanded__: true, __checked__: "on", Target: "_blank", Nodes: [
			{ Text: 'Sandwiches', __expanded__: true, Nodes: [
				{ Text: 'Ham & Cheese' }
			]},
			{ Text: 'Fish' },
			{ Text: 'Hamburgers' },
			{ Text: 'Sishi' },
			{ Text: 'Steaks' }
		]},
		{
			Text: 'Beverages', Nodes: [
			{ Text: 'Coke' },
			{ Text: 'Pepsi' },
			{ Text: 'Mountain Dew' },
			{ Text: 'Wine' },
			{ Text: 'Beer' },
			{ Text: 'Lemonade' }
		]},
		{
			Text: 'Tech', Nodes: [
			{ Text: 'Laptops' },
			{ Text: 'Desktops' },
			{ Text: 'Tablets' },
			{ Text: 'Smartphones' },
			{ Text: 'Mainframes' }
		]},
		{
			Text: 'Literature', Nodes: [
			{ Text: 'Dostoevsky' },
			{ Text: 'Vazov' },
			{ Text: 'Tolstoy' },
			{ Text: 'Goethe' },
			{ Text: 'Stainbeck' }
		]},
		{
			Text: 'Accessories', Nodes: [
			{ Text: 'Mouse' },
			{ Text: 'Keyboard' },
			{ Text: 'Microphone' },
			{ Text: 'Camera' },
			{ Text: 'Mousepad' }
		]}
	],
	results2 = [{ Text: 'Unit testing', Value: 0, ImageUrl: 'images/book.png', URL: 'http://google.com', Target: "_blank", Children: [
			{ Text1: 'Unit testing1', Value1: 1, ImageUrl1: 'images/book_add.png', URL1: 'http://infragistics.com', Children1: [
				{ Text2: 'Unit testing2', Value2: 2, ImageUrl2: 'images/coins.png', URL2: '', Children2: [{Text3: 'Unit testing3', Value3: 3}] },
				{ Text2: 'Unit testing2' }
			]},
			{ Text1: 'Unit testing1', Children1: [
				{ Text2: 'Unit testing2' },
				{ Text2: 'Unit testing2' }
			]}
		]},
		{ Text: 'Unit testing', Children: [
			{ Text1: 'Unit testing1', Children1: [
				{ Text2: 'Unit testing2' },
				{ Text2: 'Unit testing2' }
			]},
			{ Text1: 'Unit testing', Children1: [
				{ Text2: 'Unit testing' },
				{ Text2: 'Unit testing' }
			]}
		]},
		{ Text: 'Unit testing', Children: [
			{ Text1: 'Unit testing', Children1: [
				{ Text2: 'Unit testing' },
				{ Text2: 'Unit testing' }
			]},
			{ Text1: 'Unit testing', Children1: [
				{ Text2: 'Unit testing' },
				{ Text2: 'Unit testing' }
			]}
		]},
		{ Text: 'Unit testing', Children: [
			{ Text1: 'Unit testing', Children1: [
				{ Text2: 'Unit testing' },
				{ Text2: 'Unit testing' }
			]},
			{ Text1: 'Unit testing', Children1: [
				{ Text2: 'Unit testing' },
				{ Text2: 'Unit testing' }
			]}
		]},
		{ Text: 'Unit testing', Children: [
			{ Text1: 'Unit testing', Value1: 1, Children1: [
				{ Text2: 'Unit testing' },
				{ Text2: 'Unit testing' }
			]},
			{ Text1: 'Unit testing', Children1: [
				{ Text2: 'Unit testing' },
				{ Text2: 'Unit testing' }
			]}
		]}],
	notWorkingResponse1 = {
		"Items": [{
			"Id": "1",
			"Name": "PARENT",
			"Description": "",
			"Links": {
				"Self": "https://test",
				"Databases": "https://test",
				"UnitClasses": "https://test"
			},
			"Children": []
		}]
	},
	notWorkingResponse3 = {
		"Items": [{
			"Id": "1",
			"Name": "PARENT",
			"Description": "",
			"Links": {
				"Self": "https://test",
				"Databases": "https://test",
				"UnitClasses": "https://test"
			},
			"Children": {
				"__deferred": {
					"uri": "/api/jsonpitems"
				}
			}
		}]
	},
	notWorkingResponse2 = {
		"Items": [{
			"Id": "1",
			"Name": "Child1",
			"Description": "",
			"Links": {
				"Self": "https://test",
				"Elements": "https://test",
				"Tables": "https://test"
			}
		}, {
			"Id": "3",
			"Name": "Child3",
			"Description": "",
			"Links": {
				"Self": "https://test",
				"Elements": "https://test",
				"Tables": "https://test"
			}
		}]
	},
	pivotData = [
		{
			"caption": "All Products'",
			"uniqueName": "[Product].[Product].[AllProducts].&[All Products']",
			"children": []
		}
	];
var jsonpcallback = $.noop;
//$.mockjaxSettings.logging = 0;  // only critical error messages
$.ajaxSettings.jsonpCallback = function() {
	return "jsonpcallback";
};    
$.mockjax({
	url: '/api/items',
	contentType: 'text/json',
	responseTime: 0,
	response: function () {
		this.responseText = notWorkingResponse1;
	}
});

$.mockjax({
	url: '/api/items?*',
	contentType: 'text/json',
	responseTime: 0,
	response: function () {
		this.responseText = notWorkingResponse2;
	}
});

$.mockjax({
	url: '/api/jsonpitems',
	contentType: 'text/json',
	responseTime: 0,
	response: function () {
		this.responseText = notWorkingResponse3;
	}
});

$.mockjax({
	url: '/api/jsonpitems?*',
	contentType: "application/json",
	responseTime: 0,
	response: function (settings) {
		jsonpcallback(notWorkingResponse3);
	}
});

function loadTestbeds() {
	$(document.body).append(`
	<div style="float: left;">
	
		<div style="float: right" id="tree-container">
			<div id="tree1"></div>
			<ul id="tree3"></ul>
			<div id="tree4"></div>
			<div id="tree5"></div>
			<div id="remoteLOD"></div>
			<div id="treeApos"></div>
		</div>
		<div style="float: right">
		<div id="tree6">
			<ul>
				<li>Root Node
					<ul>
						<li>Child Node 1
							<ul>
								<li>Leaf Node 1</li>
								<li>Leaf Node 2</li>
							</ul>
						</li>
						<li>Child Node 2</li>
						<li>Child Node 3</li>
					</ul>
				</li>
			</ul>
		</div>
		<div id="tree7">
			<ul>
				<li>Root Node
					<ul>
						<li>Child Node 1
							<ul>
								<li>Leaf Node 1</li>
								<li>Leaf Node 2</li>
							</ul>
						</li>
						<li>Child Node 2</li>
						<li>Child Node 3</li>
					</ul>
				</li>
			</ul>
		</div>
		<div id="tree8">
			<ul>
				<li><img src="images/folder.gif" />node 1
					<ul>
						<li><img src="images/folder_images.gif" /><a href="http://google.com">child 1</a></li>
						<li><a href="http://yahoo.com">child 2</a></li>
						<li>child 3</li>
						<li>
							child 4
							<ul>
								<li>
									child 1
								</li>
								<li>
									 child 2 
								</li>
								<li>
									 child 3 
								</li>
								<li>
									 child 4 
								</li>
								<li>
									 child 5 
									<ul>
										<li>
											 child 1 
										</li>
										<li>
											 child 2 
										</li>
										<li>
											 child 3 
										</li>
										<li>
											 child 4 
										</li>
										<li>
											 child 5 
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li>
							 child 5 
							<ul>
								<li>
									 child 1 
								</li>
								<li>
									 child 2 
								</li>
								<li>
									 child 3 
								</li>
								<li>
									 child 4 
								</li>
								<li>
									 child 5 
									<ul>
										<li>
											 child 1 
										</li>
										<li>
											 child 2 
										</li>
										<li>
											 child 3 
										</li>
										<li>
											 child 4 
										</li>
										<li>
											 child 5 
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					 node 2 
					<ul>
						<li>
							 child 1 
						</li>
						<li>
							 child 2 
						</li>
						<li>
							 child 3 
						</li>
						<li>
							 child 4 
						</li>
						<li>
							 child 5 
							<ul>
								<li>
									 child 1 
								</li>
								<li>
									 child 2 
								</li>
								<li>
									 child 3 
								</li>
								<li>
									 child 4 
								</li>
								<li>
									 child 5 
									<ul>
										<li>
											 child 1 
										</li>
										<li>
											 child 2 
										</li>
										<li>
											 child 3 
										</li>
										<li>
											 child 4 
										</li>
										<li>
											 child 5 
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					 node 3 
					<ul>
						<li>
							 child 1 
						</li>
						<li>
							 child 2 
						</li>
						<li>
							 child 3 
						</li>
						<li>
							 child 4 
						</li>
						<li>
							 child 5 
							<ul>
								<li>
									 child 1 
								</li>
								<li>
									 child 2 
								</li>
								<li>
									 child 3 
								</li>
								<li>
									 child 4 
								</li>
								<li>
									 child 5 
									<ul>
										<li>
											 child 1 
										</li>
										<li>
											 child 2 
										</li>
										<li>
											 child 3 
										</li>
										<li>
											 child 4 
										</li>
										<li>
											 child 5 
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					 node 4 
					<ul>
						<li>
							 child 1 
						</li>
						<li>
							 child 2 
						</li>
						<li>
							 child 3 
						</li>
						<li>
							 child 4 
						</li>
						<li>
							 child 5 
							<ul>
								<li>
									 child 1 
								</li>
								<li>
									 child 2 
								</li>
								<li>
									 child 3 
								</li>
								<li>
									 child 4 
								</li>
								<li>
									 child 5 
									<ul>
										<li>
											 child 1 
										</li>
										<li>
											 child 2 
										</li>
										<li>
											 child 3 
										</li>
										<li>
											 child 4 
										</li>
										<li>
											 child 5 
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					 node 5 
				</li>
				<li>
					 node 6 
				</li>
			</ul>
		</div>
		<ul id="tree9">
			<li><img src="images/folder.gif" />node 1
				<ul>
					<li><img src="images/folder_images.gif" /><a href="http://google.com">child 1</a></li>
					<li><a href="http://yahoo.com">child 2</a></li>
					<li>child 3</li>
					<li>
						child 4
						<ul>
							<li>
								child 1
							</li>
							<li>
								 child 2 
							</li>
							<li>
								 child 3 
							</li>
							<li>
								 child 4 
							</li>
							<li>
								 child 5 
								<ul>
									<li>
										 child 1 
									</li>
									<li>
										 child 2 
									</li>
									<li>
										 child 3 
									</li>
									<li>
										 child 4 
									</li>
									<li>
										 child 5 
									</li>
								</ul>
							</li>
						</ul>
					</li>
					<li>
						 child 5 
						<ul>
							<li>
								 child 1 
							</li>
							<li>
								 child 2 
							</li>
							<li>
								 child 3 
							</li>
							<li>
								 child 4 
							</li>
							<li>
								 child 5 
								<ul>
									<li>
										 child 1 
									</li>
									<li>
										 child 2 
									</li>
									<li>
										 child 3 
									</li>
									<li>
										 child 4 
									</li>
									<li>
										 child 5 
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				 node 2 
				<ul>
					<li>
						 child 1 
					</li>
					<li>
						 child 2 
					</li>
					<li>
						 child 3 
					</li>
					<li>
						 child 4 
					</li>
					<li>
						 child 5 
						<ul>
							<li>
								 child 1 
							</li>
							<li>
								 child 2 
							</li>
							<li>
								 child 3 
							</li>
							<li>
								 child 4 
							</li>
							<li>
								 child 5 
								<ul>
									<li>
										 child 1 
									</li>
									<li>
										 child 2 
									</li>
									<li>
										 child 3 
									</li>
									<li>
										 child 4 
									</li>
									<li>
										 child 5 
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				 node 3 
				<ul>
					<li>
						 child 1 
					</li>
					<li>
						 child 2 
					</li>
					<li>
						 child 3 
					</li>
					<li>
						 child 4 
					</li>
					<li>
						 child 5 
						<ul>
							<li>
								 child 1 
							</li>
							<li>
								 child 2 
							</li>
							<li>
								 child 3 
							</li>
							<li>
								 child 4 
							</li>
							<li>
								 child 5 
								<ul>
									<li>
										 child 1 
									</li>
									<li>
										 child 2 
									</li>
									<li>
										 child 3 
									</li>
									<li>
										 child 4 
									</li>
									<li>
										 child 5 
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				 node 4 
				<ul>
					<li>
						 child 1 
					</li>
					<li>
						 child 2 
					</li>
					<li>
						 child 3 
					</li>
					<li>
						 child 4 
					</li>
					<li>
						 child 5 
						<ul>
							<li>
								 child 1 
							</li>
							<li>
								 child 2 
							</li>
							<li>
								 child 3 
							</li>
							<li>
								 child 4 
							</li>
							<li>
								 child 5 
								<ul>
									<li>
										 child 1 
									</li>
									<li>
										 child 2 
									</li>
									<li>
										 child 3 
									</li>
									<li>
										 child 4 
									</li>
									<li>
										 child 5 
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				 node 5 
			</li>
			<li>
				 node 6 
			</li>
		</ul>
		</div>
		
		<div id="tree10"></div>
		<ul id="tree13">
			<li><img src="images/folder.gif" />node 1
				<ul>
					<li><img src="images/folder_images.gif" /><a href="http://google.com">child 1</a></li>
					<li><a href="http://yahoo.com">child 2</a></li>
					<li>child 3</li>
					<li>
						child 4
						<ul>
							<li>
								child 1
							</li>
							<li>
								 child 2 
							</li>
							<li>
								 child 3 
							</li>
							<li>
								 child 4 
							</li>
							<li>
								 child 5 
								<ul>
									<li>
										 child 1 
									</li>
									<li>
										 child 2 
									</li>
									<li>
										 child 3 
									</li>
									<li>
										 child 4 
									</li>
									<li>
										 child 5 
									</li>
								</ul>
							</li>
						</ul>
					</li>
					<li>
						 child 5 
						<ul>
							<li>
								 child 1 
							</li>
							<li>
								 child 2 
							</li>
							<li>
								 child 3 
							</li>
							<li>
								 child 4 
							</li>
							<li>
								 child 5 
								<ul>
									<li>
										 child 1 
									</li>
									<li>
										 child 2 
									</li>
									<li>
										 child 3 
									</li>
									<li>
										 child 4 
									</li>
									<li>
										 child 5 
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				 node 2 
				<ul>
					<li>
						 child 1 
					</li>
					<li>
						 child 2 
					</li>
					<li>
						 child 3 
					</li>
					<li>
						 child 4 
					</li>
					<li>
						 child 5 
						<ul>
							<li>
								 child 1 
							</li>
							<li>
								 child 2 
							</li>
							<li>
								 child 3 
							</li>
							<li>
								 child 4 
							</li>
							<li>
								 child 5 
								<ul>
									<li>
										 child 1 
									</li>
									<li>
										 child 2 
									</li>
									<li>
										 child 3 
									</li>
									<li>
										 child 4 
									</li>
									<li>
										 child 5 
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				 node 3 
				<ul>
					<li>
						 child 1 
					</li>
					<li>
						 child 2 
					</li>
					<li>
						 child 3 
					</li>
					<li>
						 child 4 
					</li>
					<li>
						 child 5 
						<ul>
							<li>
								 child 1 
							</li>
							<li>
								 child 2 
							</li>
							<li>
								 child 3 
							</li>
							<li>
								 child 4 
							</li>
							<li>
								 child 5 
								<ul>
									<li>
										 child 1 
									</li>
									<li>
										 child 2 
									</li>
									<li>
										 child 3 
									</li>
									<li>
										 child 4 
									</li>
									<li>
										 child 5 
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				 node 4 
				<ul>
					<li>
						 child 1 
					</li>
					<li>
						 child 2 
					</li>
					<li>
						 child 3 
					</li>
					<li>
						 child 4 
					</li>
					<li>
						 child 5 
						<ul>
							<li>
								 child 1 
							</li>
							<li>
								 child 2 
							</li>
							<li>
								 child 3 
							</li>
							<li>
								 child 4 
							</li>
							<li>
								 child 5 
								<ul>
									<li>
										 child 1 
									</li>
									<li>
										 child 2 
									</li>
									<li>
										 child 3 
									</li>
									<li>
										 child 4 
									</li>
									<li>
										 child 5 
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				 node 5 
			</li>
			<li>
				 node 6 
			</li>
		</ul>
		<div id="tree14">
			<ul>
				<li>Root Node
					<ul>
						<li>Child Node 1
							<ul>
								<li>Leaf Node 1</li>
								<li>Leaf Node 2</li>
							</ul>
						</li>
						<li>Child Node 2</li>
						<li>Child Node 3</li>
					</ul>
				</li>
			</ul>
		</div>
		<div id="tree15">
			<ul>
				<li>Root Node
					<ul>
						<li>Child Node 1
							<ul>
								<li>Leaf Node 1</li>
								<li>Leaf Node 2</li>
							</ul>
						</li>
						<li>Child Node 2</li>
						<li>Child Node 3</li>
					</ul>
				</li>
			</ul>
		</div>
		<div id="tree16">
			<ul>
				<li>Root Node
					<ul>
						<li>Child Node 1
							<ul>
								<li>Leaf Node 1</li>
								<li>Leaf Node 2</li>
							</ul>
						</li>
						<li>Child Node 2</li>
						<li>Child Node 3</li>
					</ul>
				</li>
			</ul>
		</div>
		<div id="tree17">
			<ul>
				<li>Root Node
					<ul>
						<li>Child Node 1
							<ul>
								<li>Leaf Node 1</li>
								<li>Leaf Node 2</li>
							</ul>
						</li>
						<li>Child Node 2</li>
						<li>Child Node 3</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>`);

	$('#tree2').igTree({
		dataSource: results,
		checkboxMode: "triState",
		hotTracking: false
	});
	$('#tree3').igTree({
		dataSource: results2,
		bindings: {
			textKey: 'Text',
			valueKey: 'Value',
			imageUrlKey: 'ImageUrl',
			navigateUrlKey: 'URL',
			childDataProperty: 'Children',
			bindings: {
				textKey: 'Text1',
				valueKey: 'Value1',
				imageUrlKey: 'ImageUrl1',
				navigateUrlKey: 'URL1',
				childDataProperty: 'Children1',
				bindings: {
					textKey: 'Text2',
					valueKey: 'Value2',
					imageUrlKey: 'ImageUrl2',
					navigateUrlKey: 'URL2',
					childDataProperty: 'Children2',
					bindings: {
						textKey: 'Text3',
						valueKey: 'Value3'
					}
				}
			}
		}
	});
	$('#tree4').igTree({
		dataSource: results2,
		loadOnDemand: true,
		checkboxMode: 'triState',
		dragAndDrop: true,
		bindings: {
			textKey: 'Text',
			valueKey: 'Value',
			imageUrlKey: 'ImageUrl',
			navigateUrlKey: 'URL',
			childDataProperty: 'Children',
			bindings: {
				textKey: 'Text1',
				valueKey: 'Value1',
				imageUrlKey: 'ImageUrl1',
				navigateUrlKey: 'URL1',
				childDataProperty: 'Children1',
				bindings: {
					textKey: 'Text2',
					valueKey: 'Value2',
					imageUrlKey: 'ImageUrl2',
					navigateUrlKey: 'URL2',
					childDataProperty: 'Children2',
					bindings: {
						textKey: 'Text3',
						valueKey: 'Value3'
					}
				}
			}
		}
	});
	$('#tree5').igTree({
		dataSource: results2,
		checkboxMode: "biState",
		bindings: {
			textKey: 'Text',
			valueKey: 'Value',
			imageUrlKey: 'ImageUrl',
			navigateUrlKey: 'URL',
			childDataProperty: 'Children',
			targetKey: 'Target',
			nodeContentTemplate: '<span>${Text}: </span>${Value}',
			bindings: {
				textKey: 'Text1',
				valueKey: 'Value1',
				imageUrlKey: 'ImageUrl1',
				navigateUrlKey: 'URL1',
				childDataProperty: 'Children1',
				nodeContentTemplate: '<a href="http://somehref" target="haha"><font color="red">${Text1}: </font>${Value1}</a>',
				bindings: {
					textKey: 'Text2',
					valueKey: 'Value2',
					imageUrlKey: 'ImageUrl2',
					navigateUrlKey: 'URL2',
					childDataProperty: 'Children2',
					nodeContentTemplate: '<a><font color="red">${Text2}: </font><font color="blue">${Value2}</font></a>',
					bindings: {
						textKey: 'Text3',
						valueKey: 'Value3'
					}
				}
			}
		}
	});
	$('#tree12').igTree();
	$('#tree13').igTree();
	$('#tree14').igTree({
		checkboxMode: 'biState',
		parentNodeImageUrl: 'images/folder.gif',
		parentNodeImageTooltip: 'folder',
		leafNodeImageUrl: 'images/folder_images.gif',
		leafNodeImageTooltip: 'folder_image'
	});
	$('#tree15').igTree({
		parentNodeImageClass: 'css-sprite ui-icon-carat-1-n',
		parentNodeImageTooltip: 'folder',
		leafNodeImageClass: 'css-sprite ui-icon-carat-1-ne',
		leafNodeImageTooltip: 'folder_image'
	});
	$('#tree16').igTree({
		pathSeparator: '.'
	});
	$('#tree17').igTree({
		pathSeparator: '//'
	});

}

var initialized = false;
QUnit.module("igTree", {
	setup: function() {
		//pause testing until tree is initialized
		if (!initialized) {
			loadTestbeds();
			initialized = true;
		}
	},
	teardown: function() {
	}
});

/* ***************** igTree Rendering ***************** */

var testId_4 = 'igTree expand/collapse test.';
var testId_5 = 'igTree checkbox rendering.';
var testId_6 = 'igTree checkbox modes biState.';
var testId_7 = 'igTree checkbox modes triState.';
var testId_8 = 'igTree selection.';
var testId_9 = 'igTree parent and leaf node images and tooltips.';
var testId_10 = 'igTree parent and leaf node css classes and tooltips.';
var testId_11 = 'igTree path separators.';
var testId_12 = 'igTree expand/collapse test with browser events.';
var testId_13 = 'igTree checkbox modes biState browser events.';
var testId_14 = 'igTree checkbox modes triState browser events.';
var testId_15 = 'igTree selection browser event.';
var testId_16 = 'igTree hot tracking browser events.';
var testId_17 = 'igTree keyboard navigation browser events.';
var testId_18 = 'igTree keyboard checkboxes browser events.';
var testId_19 = 'igTree binding to an object';

QUnit.test('igTree script loaded test.', function (assert) {
	var treeContainer = $('<div id="tree2"></div>');
	assert.expect(2);
	assert.ok(typeof(treeContainer.igTree) === 'function', 'igTree script is not loaded');
	treeContainer = treeContainer.igTree();
	assert.ok(treeContainer.length > 0, 'igTree did not initialize');
});
QUnit.test('igTree widget rendering test.', function (assert) {
	var container = $('#tree12');
	assert.expect(12);
	$.ig.TestUtil.checkClass(container, 'ui-widget');
	$.ig.TestUtil.checkClass(container, 'ui-igtree');
	container = container.children().first();
	$.ig.TestUtil.checkClass(container, 'ui-igtree-collection');
	$.ig.TestUtil.checkClass(container, 'ui-igtree-root');
	$.ig.TestUtil.checkClass(container, 'ui-widget-content');
	assert.equal(container.attr('data-depth'), '0', 'The data-depth property did not populate correctly for the root UL');
	
	// Rerun on UL
	container = $('#tree3');
	$.ig.TestUtil.checkClass(container, 'ui-widget');
	$.ig.TestUtil.checkClass(container, 'ui-igtree');
	$.ig.TestUtil.checkClass(container, 'ui-igtree-collection');
	$.ig.TestUtil.checkClass(container, 'ui-igtree-root');
	$.ig.TestUtil.checkClass(container, 'ui-widget-content');
	assert.equal(container.attr('data-depth'), '0', 'The data-depth property did not populate correctly for the root UL');
});
QUnit.test('igTree node and contents rendering test.', function (assert) {
	var node = $('#tree12').children('ul').children('li').first(), 
		expander = node.children('span'), 
		img = node.children('img'), 
		anchor = node.children('a'),
		children = node.children('ul');
	assert.expect(42);
	$.ig.TestUtil.checkClass(node, 'ui-igtree-node');
	$.ig.TestUtil.checkClass(node, 'ui-igtree-noderoot');
	$.ig.TestUtil.checkClass(node, 'ui-igtree-parentnode');
	assert.equal(node.attr('data-role'), 'node', 'Data role was not initialized for the tree node');
	$.ig.TestUtil.checkClass(expander, 'ui-icon');
	$.ig.TestUtil.checkClass(expander, 'ui-icon-triangle-1-e');
	$.ig.TestUtil.checkClass(anchor, 'ui-corner-all');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), false, 'Data-exp attrubute did not populate properly.');
	assert.equal(img.attr('src'), 'images/folder.gif', 'Image URL did not render properly');
	assert.equal(img.attr('alt'), 'error', 'The alt attribute of the parent node image did not render properly');
	img = children.children('li').first().children('img');
	assert.equal(img.attr('src'), 'images/folder_images.gif', 'Image URL did not render properly');
	assert.equal(img.attr('alt'), 'error', 'The alt attribute of the parent node image did not render properly');
	assert.equal(anchor.attr('href'), '#', 'The empty href "#" did not render properly');
	assert.equal(anchor.text(), 'node 1', 'Node text did not populate correctly');
	assert.equal(children.attr('data-depth'), '1', 'The data-depth attribute did not populate correctly for child UL.');
	
	$('#tree12').igTree('expand', node);
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Data-exp attrubute did not populate properly.');
	$.ig.TestUtil.checkClass(expander, 'ui-icon');
	$.ig.TestUtil.checkClass(expander, 'ui-icon-triangle-1-s');
	node = $('#tree12').children('ul').children('li').last();
	$.ig.TestUtil.checkClass(node, 'ui-igtree-node');
	$.ig.TestUtil.checkClass(node, 'ui-igtree-noderoot');
	assert.notEqual(node.hasClass('ui-igtree-parentnode'), true, 'A node with no children has class applied for nodes with children');
	
	// Rerunning the test with a tree initialized on UL
	node = $('#tree13').children('li').first(); 
	expander = node.children('span');
	img = node.children('img');
	anchor = node.children('a');
	children = node.children('ul');
	$.ig.TestUtil.checkClass(node, 'ui-igtree-node');
	$.ig.TestUtil.checkClass(node, 'ui-igtree-noderoot');
	$.ig.TestUtil.checkClass(node, 'ui-igtree-parentnode');
	assert.equal(node.attr('data-role'), 'node', 'Data role was not initialized for the tree node');
	$.ig.TestUtil.checkClass(expander, 'ui-icon');
	$.ig.TestUtil.checkClass(expander, 'ui-icon-triangle-1-e');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), false, 'Data-exp attrubute did not populate properly.');
	assert.equal(expander.attr('data-role'), 'expander', 'Data-exp attrubute did not populate properly.');
	assert.equal(img.attr('src'), 'images/folder.gif', 'Image URL did not render properly');
	assert.equal(img.attr('alt'), 'error', 'The alt attribute of the parent node image did not render properly');
	img = children.children('li').first().children('img');
	assert.equal(img.attr('src'), 'images/folder_images.gif', 'Image URL did not render properly');
	assert.equal(img.attr('alt'), 'error', 'The alt attribute of the parent node image did not render properly');
	assert.equal(anchor.attr('href'), '#', 'The empty href "#" did not render properly');
	assert.equal(anchor.text(), 'node 1', 'Node text did not populate correctly');
	assert.equal(children.attr('data-depth'), '1', 'The data-depth attribute did not populate correctly for child UL.');
	
	$('#tree12').igTree('expand', node);
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Data-exp attrubute did not populate properly.');
	$.ig.TestUtil.checkClass(expander, 'ui-icon');
	$.ig.TestUtil.checkClass(expander, 'ui-icon-triangle-1-s');
	node = $('#tree12').children('ul').children('li').last();
	$.ig.TestUtil.checkClass(node, 'ui-igtree-node');
	$.ig.TestUtil.checkClass(node, 'ui-igtree-noderoot');
	assert.notEqual(node.hasClass('ui-igtree-parentnode'), true, 'A node with no children has class applied for nodes with children');
});
QUnit.test(testId_4, function (assert) {
	var node = $('#tree12').igTree('nodeByPath', '1'), expander = node.children('[data-role=expander]'),
		data = $('#tree12').igTree('nodeDataFor', '1'), binding = $('#tree12').igTree('option', 'bindings');
	assert.expect(36);
	assert.ok(node.length > 0, 'Node did not retrieve correctly');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), false, 'Node is initially expanded');
	assert.equal(data[ binding.expandedKey ], false, 'Node data is initially expanded');
	$('#tree12').igTree('toggle', node);
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Node did not expand after toggle');
	assert.equal(data[ binding.expandedKey ], true, 'Node data did not expand after toggle');
	$('#tree12').igTree('toggle', node);
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), false, 'Node did not collapse after toggle');
	assert.equal(data[ binding.expandedKey ], false, 'Node data did not collapse after toggle');
	$('#tree12').igTree('collapse', node);
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), false, 'Node performed collapse in collapsed state');
	assert.equal(data[ binding.expandedKey ], false, 'Node data performed collapse in collapsed state');
	$('#tree12').igTree('expand', node);
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Node did not expand after calling expand');
	assert.equal(data[ binding.expandedKey ], true, 'Node data did not expand after calling expand');
	$('#tree12').igTree('expand', node);
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Node performed expand in expanded state');
	assert.equal(data[ binding.expandedKey ], true, 'Node data performed expand in expanded state');
	$('#tree12').igTree('option', 'singleBranchExpand', true);
	var node2 = $('#tree12').igTree('nodeByPath', '2'), expander2 = node2.children('[data-role=expander]'),
		data2 = $('#tree12').igTree('nodeDataFor', '2');
	assert.equal($.ig.TestUtil.boolParse(expander2.attr('data-exp')), false, 'Node is initially expanded');
	assert.equal(data2[ binding.expandedKey ], false, 'Node data is initially expanded');
	$('#tree12').igTree('expand', node2);
	assert.equal($.ig.TestUtil.boolParse(expander2.attr('data-exp')), true, 'Node did not expand after calling expand');
	assert.equal(data2[ binding.expandedKey ], true, 'Node data did not expand after calling expand');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), false, 'Node did not collapse after expanding another node on the same level with singleBranchExpand=true');
	assert.equal(data[ binding.expandedKey ], false, 'Node data did not collapse after expanding another node on the same level with singleBranchExpand=true');
	expander.click();
	assert.equal($.ig.TestUtil.boolParse(expander2.attr('data-exp')), false, 'Node did not expand after calling expand');
	assert.equal(data2[ binding.expandedKey ], false, 'Node data did not expand after calling expand');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Node did not collapse after expanding another node on the same level with singleBranchExpand=true');
	assert.equal(data[ binding.expandedKey ], true, 'Node data did not collapse after expanding another node on the same level with singleBranchExpand=true');
	expander2.click();
	assert.equal($.ig.TestUtil.boolParse(expander2.attr('data-exp')), true, 'Node did not expand after calling expand');
	assert.equal(data2[ binding.expandedKey ], true, 'Node data did not expand after calling expand');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), false, 'Node did not collapse after expanding another node on the same level with singleBranchExpand=true');
	assert.equal(data[ binding.expandedKey ], false, 'Node data did not collapse after expanding another node on the same level with singleBranchExpand=true');
	$('#tree12').igTree('expandToNode', '0_4_0');
	node = $('#tree12').igTree('nodeByPath', '0');
	expander = node.children('[data-role=expander]');
	data = $('#tree12').igTree('nodeDataFor', '0');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Node did not expand with expandToNode');
	assert.equal(data[ binding.expandedKey ], true, 'Node did not expand with expandToNode');
	node = $('#tree12').igTree('nodeByPath', '0_4');
	data = $('#tree12').igTree('nodeDataFor', '0_4');
	expander = node.children('[data-role=expander]');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Node did not expand with expandToNode');
	assert.equal(data[ binding.expandedKey ], true, 'Node did not expand with expandToNode');
	$('#tree12').igTree('expandToNode', '0_4_1', true);
	node = $('#tree12').igTree('nodeByPath', '0');
	data = $('#tree12').igTree('nodeDataFor', '0');
	expander = node.children('[data-role=expander]');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Node did not expand with expandToNode');
	assert.equal(data[ binding.expandedKey ], true, 'Node did not expand with expandToNode');
	node = $('#tree12').igTree('nodeByPath', '0_4');
	data = $('#tree12').igTree('nodeDataFor', '0_4');
	expander = node.children('[data-role=expander]');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Node did not expand with expandToNode');
	assert.equal(data[ binding.expandedKey ], true, 'Node did not expand with expandToNode');
	node = $('#tree12').igTree('nodeByPath', '0_4_1');
	assert.ok($("#tree12").igTree("isSelected", node), 'Node is not selected after expandToNode with selection.');
	$("#tree12").igTree("collapse", $('#tree12').igTree('nodeByPath', '0_4'));
});
QUnit.test(testId_5, function (assert) {
	var node = $('#tree14').igTree('nodeByPath', '0'), checkbox = node.children('[data-role=checkbox]'),
		data = $('#tree14').igTree('nodeDataFor', '0'), binding = $('#tree14').igTree('option', 'bindings');
	assert.expect(9);
	assert.ok(checkbox.length > 0, 'Checkbox was not retrieved correctly');
	$.ig.TestUtil.checkClass(checkbox, 'ui-state-default');
	$.ig.TestUtil.checkClass(checkbox, 'ui-corner-all');
	$.ig.TestUtil.checkClass(checkbox, 'ui-igcheckbox-normal');
	assert.equal(checkbox.attr('data-chk'), 'off', 'The data-chk attribute was not initialized properly');
	assert.equal(data[ binding.checkedKey ], "off", 'The checkstate data of the checkbox is not initialized properly.');
	var icon = checkbox.children('span');
	$.ig.TestUtil.checkClass(icon, 'ui-icon');
	$.ig.TestUtil.checkClass(icon, 'ui-icon-check');
	$.ig.TestUtil.checkClass(icon, 'ui-igcheckbox-normal-off');
});
QUnit.test(testId_6, function (assert) {
	var node = $('#tree14').igTree('nodeByPath', '0'), checkbox = node.children('[data-role=checkbox]'),
		data = $('#tree14').igTree('nodeDataFor', '0'), binding = $('#tree14').igTree('option', 'bindings');
	assert.expect(30);
	assert.equal(checkbox.attr('data-chk'), 'off', 'The checkstate of the checkbox is rendered as on');
	assert.equal(data[ binding.checkedKey ], "off", 'The checkstate data of the checkbox is rendered as on');
	$('#tree14').igTree('toggleCheckstate', node);
	$.ig.TestUtil.checkClass(checkbox, 'ui-state-default');
	$.ig.TestUtil.checkClass(checkbox, 'ui-corner-all');
	$.ig.TestUtil.checkClass(checkbox, 'ui-igcheckbox-normal');
	var icon = checkbox.children('span');
	$.ig.TestUtil.checkClass(icon, 'ui-icon');
	$.ig.TestUtil.checkClass(icon, 'ui-icon-check');
	$.ig.TestUtil.checkClass(icon, 'ui-igcheckbox-normal-on');
	assert.equal(checkbox.attr('data-chk'), 'on', 'The checkstate did not toggle to on');
	assert.equal(data[ binding.checkedKey ], "on", 'The checkstate data did not toggle to on');
	node = node.find('ul > li:first');
	data = $('#tree14').igTree('nodeDataFor', '0_0');
	checkbox = node.children('[data-role=checkbox]');
	assert.equal(checkbox.attr('data-chk'), 'off', 'Checkstate has cascaded in biState');
	assert.equal(data[ binding.checkedKey ], "off", 'Checkstate data has cascaded in biStaten');
	$('#tree14').igTree('toggleCheckstate', node);
	$.ig.TestUtil.checkClass(checkbox, 'ui-state-default');
	$.ig.TestUtil.checkClass(checkbox, 'ui-corner-all');
	$.ig.TestUtil.checkClass(checkbox, 'ui-igcheckbox-normal');
	icon = checkbox.children('span');
	$.ig.TestUtil.checkClass(icon, 'ui-icon');
	$.ig.TestUtil.checkClass(icon, 'ui-icon-check');
	$.ig.TestUtil.checkClass(icon, 'ui-igcheckbox-normal-on');
	assert.equal(checkbox.attr('data-chk'), 'on', 'The checkstate of the checkbox is rendered as on');
	assert.equal(data[ binding.checkedKey ], "on", 'The checkstate data of the checkbox is rendered as on');
	$('#tree14').igTree('toggleCheckstate', node);
	$.ig.TestUtil.checkClass(checkbox, 'ui-state-default');
	$.ig.TestUtil.checkClass(checkbox, 'ui-corner-all');
	$.ig.TestUtil.checkClass(checkbox, 'ui-igcheckbox-normal');
	icon = checkbox.children('span');
	$.ig.TestUtil.checkClass(icon, 'ui-icon');
	$.ig.TestUtil.checkClass(icon, 'ui-icon-check');
	$.ig.TestUtil.checkClass(icon, 'ui-igcheckbox-normal-off');
	assert.equal(checkbox.attr('data-chk'), 'off', 'The checkstate did not return to off');
	assert.equal(data[ binding.checkedKey ], "off", 'The checkstate data did not return to off');
	node = $('#tree14').igTree('nodeByPath', '0');
	data = $('#tree14').igTree('nodeDataFor', '0')
	$('#tree14').igTree('toggleCheckstate', node);
	checkbox = node.children('[data-role=checkbox]');
	assert.equal(checkbox.attr('data-chk'), 'off', 'The checkstate did not return to off');
	assert.equal(data[ binding.checkedKey ], "off", 'The checkstate data did not return to off');
});
QUnit.test(testId_7, function (assert) {
	var node = $('#tree14').igTree('nodeByPath', '0'), checkbox = node.children('[data-role=checkbox]'),
		data = $('#tree14').igTree('nodeDataFor', '0'), binding = $('#tree14').igTree('option', 'bindings');
	assert.expect(41);
	$('#tree14').igTree('option', 'checkboxMode', 'triState');
	assert.equal(checkbox.attr('data-chk'), 'off', 'The checkstate of the checkbox is rendered as on');
	assert.equal(data[ binding.checkedKey ], "off", 'The checkstate data of the checkbox is rendered as on');
	var selector = $('#tree14').igTree('checkedNodes');
	assert.equal(selector.length, 0, 'The checkboxes did not cascade or the API method returned wrong');
	selector = $('#tree14').igTree('partiallyCheckedNodes');
	assert.equal(selector.length, 0, 'The checkboxes did not cascade or the API method returned wrong');
	$('#tree14').igTree('toggleCheckstate', node);
	$.ig.TestUtil.checkClass(checkbox, 'ui-state-default');
	$.ig.TestUtil.checkClass(checkbox, 'ui-corner-all');
	$.ig.TestUtil.checkClass(checkbox, 'ui-igcheckbox-normal');
	var icon = checkbox.children('span');
	$.ig.TestUtil.checkClass(icon, 'ui-icon');
	$.ig.TestUtil.checkClass(icon, 'ui-icon-check');
	$.ig.TestUtil.checkClass(icon, 'ui-igcheckbox-normal-on');
	assert.equal(checkbox.attr('data-chk'), 'on', 'The checkstate did not toggle to on');
	assert.equal(data[ binding.checkedKey ], "on", 'The checkstate data did not toggle to on');
	selector = $('#tree14').igTree('checkedNodes');
	assert.equal(selector.length, 6, 'The checkboxes did not cascade ot the API method returned wrong');
	node = $('#tree14').igTree('nodeByPath', '0_1');
	data = $('#tree14').igTree('nodeDataFor', '0_1');
	assert.equal(data[ binding.checkedKey ], "on", 'The checkstate data did not cascade properly.');
	checkbox = node.children('[data-role=checkbox]');
	icon = checkbox.children('span');
	$('#tree14').igTree('toggleCheckstate', node);
	selector = $('#tree14').igTree('checkedNodes');
	assert.equal(selector.length, 4, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('uncheckedNodes');
	assert.equal(selector.length, 1, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('partiallyCheckedNodes');
	assert.equal(selector.length, 1, 'The checkboxes did not cascade ot the API method returned wrong');
	assert.equal(data[ binding.checkedKey ], "off", 'The checkstate data did not cascade properly');
	node = $('#tree14').igTree('nodeByPath', '0');
	data = $('#tree14').igTree('nodeDataFor', '0');
	checkbox = node.children('[data-role=checkbox]');
	icon = checkbox.children('span');
	$.ig.TestUtil.checkClass(icon, 'ui-icon');
	$.ig.TestUtil.checkClass(icon, 'ui-icon-check');
	$.ig.TestUtil.checkClass(icon, 'ui-igcheckbox-normal-on');
	$.ig.TestUtil.checkClass(icon, 'ui-state-disabled');
	assert.equal(data[ binding.checkedKey ], "partial", 'The checkstate data of the checkbox is node partial');
	$('#tree14').igTree('toggleCheckstate', node);
	selector = $('#tree14').igTree('uncheckedNodes');
	assert.equal(selector.length, 6, 'The checkboxes did not cascade ot the API method returned wrong');
	assert.equal(data[ binding.checkedKey ], "off", 'The checkstate data did not toggle to off');
	data = $('#tree14').igTree('nodeDataFor', '0_0');
	assert.equal(data[ binding.checkedKey ], "off", 'The checkstate data did not cascade properly');
	$('#tree14').igTree('toggleCheckstate', node);
	node = $('#tree14').igTree('nodeByPath', '0_0_0');
	data = $('#tree14').igTree('nodeDataFor', '0_0_0');
	assert.equal(data[ binding.checkedKey ], "on", 'The checkstate data did not cascade properly');
	$('#tree14').igTree('toggleCheckstate', node);
	data = $('#tree14').igTree('nodeDataFor', '0_0');
	assert.equal(data[ binding.checkedKey ], "partial", 'The checkstate data did not cascade properly');
	selector = $('#tree14').igTree('checkedNodes');
	assert.equal(selector.length, 3, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('uncheckedNodes');
	assert.equal(selector.length, 1, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('partiallyCheckedNodes');
	assert.equal(selector.length, 2, 'The checkboxes did not cascade ot the API method returned wrong');
	node = $('#tree14').igTree('nodeByPath', '0_0_1');
	$('#tree14').igTree('toggleCheckstate', node);
	assert.equal(selector.length, 2, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('uncheckedNodes');
	assert.equal(selector.length, 3, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('partiallyCheckedNodes');
	assert.equal(selector.length, 1, 'The checkboxes did not cascade ot the API method returned wrong');
	$('#tree14').igTree('toggleCheckstate', node);
	selector = $('#tree14').igTree('checkedNodes');
	assert.equal(selector.length, 3, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('uncheckedNodes');
	assert.equal(selector.length, 1, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('partiallyCheckedNodes');
	assert.equal(selector.length, 2, 'The checkboxes did not cascade ot the API method returned wrong');
	node = $('#tree14').igTree('nodeByPath', '0_0_0');
	var partialNode = $('#tree14').igTree('nodeByPath', '0_0');
	$.ig.TestUtil.checkClass(partialNode.children('[data-role=checkbox]').children("span"), 'ui-state-disabled', "The node doesn't have partial checkstate.");
	$('#tree14').igTree('toggleCheckstate', node);
	assert.ok(!partialNode.children('[data-role=checkbox]').children("span").hasClass('ui-state-disabled'), "The partial checkstate class wasn't removed.");
	selector = $('#tree14').igTree('checkedNodes');
	data = $('#tree14').igTree('nodeDataFor', '0');
	assert.equal(selector.length, 6, 'The checkboxes did not cascade ot the API method returned wrong');
	assert.equal(data[ binding.checkedKey ], "on", 'The checkstate data did not cascade properly');
});
QUnit.test(testId_8, function (assert) {
	var nodePath = '0', node = $('#tree12').igTree('nodeByPath', nodePath), anchor = node.children('a');
	assert.expect(47);
	assert.ok(anchor.length > 0, 'Anchor is not properly returned.');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'isSelected returned wrong value');
	$('#tree12').igTree('deselect', node);
	assert.ok(!$('#tree12').igTree('isSelected', node), 'isSelected returned wrong value');
	$('#tree12').igTree('select', node);
	var selected = $('#tree12').igTree('selectedNode');
	assert.ok($('#tree12').igTree('isSelected', selected.element), 'isSelected returned wrong value');
	$.ig.TestUtil.checkClass(anchor, 'ui-state-active');
	assert.equal(selected.path, selected.element.attr('data-path'), 'Selected node object is corrupted');
	assert.equal(nodePath, selected.path, 'A different than the expected node has been selected');
	var bindings = $('#tree12').igTree('option', 'bindings');
	assert.equal(selected.binding.valueKey, bindings.valueKey, 'Binding value key does not match');
	assert.equal(selected.binding.textKey, bindings.textKey, 'Binding value key does not match');
	assert.equal(selected.binding.imageUrlKey, bindings.imageUrlKey, 'Binding value key does not match');
	assert.equal(selected.binding.navigateUrlKey, bindings.navigateUrlKey, 'Binding value key does not match');
	assert.equal(selected.binding.childDataProperty, bindings.childDataProperty, 'Binding value key does not match');
	assert.ok(typeof(selected.data[bindings.childDataProperty]) === 'object', 'Child data is not retrieved properly');
	assert.equal(selected.data[bindings.textKey], 'node 1', 'Text in the data is wrong');
	assert.equal(selected.data[bindings.imageUrlKey], 'images/folder.gif', 'Text in the data is wrong');
	nodePath = '1';
	var node2 = $('#tree12').igTree('nodeByPath', nodePath);
	assert.ok(!$('#tree12').igTree('isSelected', node2), 'isSelected returned wrong value');
	$('#tree12').igTree('select', node2);
	assert.notEqual(anchor.hasClass('ui-state-active'), true, 'Node 1 did not deselect on new selection');
	anchor = node2.children('a');
	$.ig.TestUtil.checkClass(anchor, 'ui-state-active');
	assert.ok($('#tree12').igTree('isSelected', node2), 'isSelected returned wrong value');
	selected = $('#tree12').igTree('selectedNode');
	assert.equal(nodePath, selected.path, 'A different than the expected node has been selected');
	assert.equal(node2, selected.element, 'The selected element does not match');
	assert.ok($('#tree12').igTree('isSelected', selected.element), 'isSelected returned wrong value');
	$('#tree12').igTree('select', node2);
	assert.ok($('#tree12').igTree('isSelected', node2), 'isSelected returned wrong value');
	$.ig.TestUtil.checkClass(anchor, 'ui-state-active');
	selected = $('#tree12').igTree('selectedNode');
	assert.equal(nodePath, selected.path, 'Node 2 deselected upon performing select');
	assert.equal(node2, selected.element, 'The selected element does not match');
	$('#tree12').igTree('deselect', node2);
	assert.ok(!$('#tree12').igTree('isSelected', node2), 'isSelected returned wrong value');
	assert.notEqual(anchor.hasClass('ui-state-active'), true, 'Node 1 did not deselect on new selection');
	selected = $('#tree12').igTree('selectedNode');
	assert.equal(selected.path, null, 'Path for selection did not reset');
	assert.equal(selected.element, null, 'Element for selection did not reset');
	assert.equal(selected.data, null, 'Data for selection did not reset');
	assert.equal(selected.binding, null, 'Binding for selection did not reset');
	$('#tree12').igTree('select', node2);
	assert.ok($('#tree12').igTree('isSelected', node2), 'isSelected returned wrong value');
	$.ig.TestUtil.checkClass(anchor, 'ui-state-active');
	selected = $('#tree12').igTree('selectedNode');
	assert.equal(nodePath, selected.path, 'Node 2 deselected upon performing select');
	assert.equal(node2, selected.element, 'The selected element does not match');
	$('#tree12').igTree('clearSelection');
	assert.ok(!$('#tree12').igTree('isSelected', node2), 'isSelected returned wrong value');
	assert.notEqual(anchor.hasClass('ui-state-active'), true, 'Node 1 did not deselect on new selection');
	selected = $('#tree12').igTree('selectedNode');
	assert.equal(selected.path, null, 'Path for selection did not reset');
	assert.equal(selected.element, null, 'Element for selection did not reset');
	assert.equal(selected.data, null, 'Data for selection did not reset');
	assert.equal(selected.binding, null, 'Binding for selection did not reset');
	nodePath = "0";
	node = $('#tree12').igTree('nodeByPath', nodePath);
	anchor = node.children('a');
	anchor.click();
	selected = $('#tree12').igTree('selectedNode');
	assert.ok($('#tree12').igTree('isSelected', selected.element), 'isSelected returned wrong value');
	assert.ok($('#tree12').igTree('isSelected', node), 'isSelected returned wrong value');
	$.ig.TestUtil.checkClass(anchor, 'ui-state-active');
	assert.equal(selected.path, selected.element.attr('data-path'), 'Selected node object is corrupted');
	assert.equal(nodePath, selected.path, 'A different than the expected node has been selected');
	$('#tree12').igTree('deselect', node);
});
QUnit.test(testId_9, function (assert) {
	var nodePath = '0', node = $('#tree14').igTree('nodeByPath', nodePath), image = node.children('img');
	assert.expect(13);
	assert.ok(image.length > 0, 'Image is not returned properly');
	assert.equal(image.attr('src'), 'images/folder.gif', 'Parent node image is not applied correctly');
	assert.equal(image.attr('title'), 'folder', 'Parent node image tooltip is not applied correctly');
	node = $('#tree14').igTree('nodeByPath', '0_0'); 
	image = node.children('img');
	assert.equal(image.attr('src'), 'images/folder.gif', 'Parent node image is not applied correctly');
	assert.equal(image.attr('title'), 'folder', 'Parent node image tooltip is not applied correctly');
	node = $('#tree14').igTree('nodeByPath', '0_1'); 
	image = node.children('img');
	assert.equal(image.attr('src'), 'images/folder_images.gif', 'Leaf node image is not applied correctly');
	assert.equal(image.attr('title'), 'folder_image', 'Leaf node image tooltip is not applied correctly');
	node = $('#tree14').igTree('nodeByPath', '0_2'); 
	image = node.children('img');
	assert.equal(image.attr('src'), 'images/folder_images.gif', 'Leaf node image is not applied correctly');
	assert.equal(image.attr('title'), 'folder_image', 'Leaf node image tooltip is not applied correctly');
	node = $('#tree14').igTree('nodeByPath', '0_0_0'); 
	image = node.children('img');
	assert.equal(image.attr('src'), 'images/folder_images.gif', 'Leaf node image is not applied correctly');
	assert.equal(image.attr('title'), 'folder_image', 'Leaf node image tooltip is not applied correctly');
	node = $('#tree14').igTree('nodeByPath', '0_0_1'); 
	image = node.children('img');
	assert.equal(image.attr('src'), 'images/folder_images.gif', 'Leaf node image is not applied correctly');
	assert.equal(image.attr('title'), 'folder_image', 'Leaf node image tooltip is not applied correctly');
});
QUnit.test(testId_10, function (assert) {
	var nodePath = '0', node = $('#tree15').igTree('nodeByPath', nodePath), image = node.children('span[data-role=parent-node-image]');
	assert.expect(13);
	assert.ok(image.length > 0, 'Image class is not returned properly');
	$.ig.TestUtil.checkClass(image, 'ui-icon-carat-1-n');
	assert.equal(image.attr('title'), 'folder', 'Parent node image tooltip is not applied correctly');
	node = $('#tree15').igTree('nodeByPath', '0_0');
	image = node.children('span[data-role=parent-node-image]');
	$.ig.TestUtil.checkClass(image, 'ui-icon-carat-1-n');
	assert.equal(image.attr('title'), 'folder', 'Parent node image tooltip is not applied correctly');
	node = $('#tree15').igTree('nodeByPath', '0_1'); 
	image = node.children('span[data-role=leaf-node-image]');
	$.ig.TestUtil.checkClass(image, 'ui-icon-carat-1-ne');
	assert.equal(image.attr('title'), 'folder_image', 'Leaf node image tooltip is not applied correctly');
	node = $('#tree15').igTree('nodeByPath', '0_2'); 
	image = node.children('span[data-role=leaf-node-image]');
	$.ig.TestUtil.checkClass(image, 'ui-icon-carat-1-ne');
	assert.equal(image.attr('title'), 'folder_image', 'Leaf node image tooltip is not applied correctly');
	node = $('#tree15').igTree('nodeByPath', '0_0_0'); 
	image = node.children('span[data-role=leaf-node-image]');
	$.ig.TestUtil.checkClass(image, 'ui-icon-carat-1-ne');
	assert.equal(image.attr('title'), 'folder_image', 'Leaf node image tooltip is not applied correctly');
	node = $('#tree15').igTree('nodeByPath', '0_0_1'); 
	image = node.children('span[data-role=leaf-node-image]');
	$.ig.TestUtil.checkClass(image, 'ui-icon-carat-1-ne');
	assert.equal(image.attr('title'), 'folder_image', 'Leaf node image tooltip is not applied correctly');
});
QUnit.test(testId_11, function (assert) {
	var node = $('#tree16').igTree('nodeByPath', '0.0');
	assert.expect(8);
	assert.ok(node.length > 0, 'Node did not return correctly when path is set to "."');
	assert.ok(node.attr('data-path'), '0.0', 'data-path attribute did not match');
	assert.ok(node.attr('data-role'), 'node', 'data-role attribute did not match');
	assert.equal($('#tree16').igTree('nodeDataFor', '0.0').Text, 'Child Node 1', 'nodeDataFor returned wrong text');
	node = $('#tree17').igTree('nodeByPath', '0//0//0');
	assert.ok(node.length > 0, 'Node did not return correctly when path is set to "//"');
	assert.ok(node.attr('data-path'), '0//0//0', 'data-path attribute did not match');
	assert.ok(node.attr('data-role'), 'node', 'data-role attribute did not match');
	assert.equal($('#tree17').igTree('nodeDataFor', '0//0//0').Text, 'Leaf Node 1', 'nodeDataFor returned wrong text');
});
QUnit.test(testId_12, function (assert) {
	var node = $('#tree12').igTree('nodeByPath', '1'), expander = node.children('[data-role=expander]');
	assert.expect(8);
	assert.ok(node.length > 0, 'Node did not retrieve correctly');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), false, 'Node is initially expanded');
	expander.click();
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Node did not expand after toggle');
	expander.click();
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), false, 'Node did not collapse after toggle');
	expander.click();
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), true, 'Node did not expand after calling expand');
	$('#tree12').igTree('option', 'singleBranchExpand', true);
	var node2 = $('#tree12').igTree('nodeByPath', '2'), expander2 = node2.children('[data-role=expander]');
	assert.equal($.ig.TestUtil.boolParse(expander2.attr('data-exp')), false, 'Node is initially expanded');
	expander2.click();
	assert.equal($.ig.TestUtil.boolParse(expander2.attr('data-exp')), true, 'Node did not expand after calling expand');
	assert.equal($.ig.TestUtil.boolParse(expander.attr('data-exp')), false, 'Node did not collapse after expanding another node on the same level with singleBranchExpand=true');
});
QUnit.test(testId_13, function (assert) {
	var node = $('#tree14').igTree('nodeByPath', '0'), checkbox = node.children('[data-role=checkbox]');
	assert.expect(26);
	checkbox.children('span').click();
	$('#tree14').igTree('option', 'checkboxMode', 'biState');
	assert.equal(checkbox.attr('data-chk'), 'off', 'The checkstate of the checkbox is rendered as on');
	checkbox.children('span').click();
	$.ig.TestUtil.checkClass(checkbox, 'ui-state-default');
	$.ig.TestUtil.checkClass(checkbox, 'ui-corner-all');
	$.ig.TestUtil.checkClass(checkbox, 'ui-igcheckbox-normal');
	var icon = checkbox.children('span');
	$.ig.TestUtil.checkClass(icon, 'ui-icon');
	$.ig.TestUtil.checkClass(icon, 'ui-icon-check');
	$.ig.TestUtil.checkClass(icon, 'ui-igcheckbox-normal-on');
	assert.equal(checkbox.attr('data-chk'), 'on', 'The checkstate did not toggle to on');
	checkbox.children('span').mouseover();
	$.ig.TestUtil.checkClass(checkbox, 'ui-state-hover', "Hover class was not applied");
	checkbox.children('span').mouseout();
	assert.ok(!checkbox.hasClass('ui-state-hover'), "Hover class was not removed");
	node = node.find('ul > li:first');
	checkbox = node.children('[data-role=checkbox]');
	assert.equal(checkbox.attr('data-chk'), 'off', 'Checkstate has cascaded in biState');
	checkbox.children('span').click();
	$.ig.TestUtil.checkClass(checkbox, 'ui-state-default');
	$.ig.TestUtil.checkClass(checkbox, 'ui-corner-all');
	$.ig.TestUtil.checkClass(checkbox, 'ui-igcheckbox-normal');
	icon = checkbox.children('span');
	$.ig.TestUtil.checkClass(icon, 'ui-icon');
	$.ig.TestUtil.checkClass(icon, 'ui-icon-check');
	$.ig.TestUtil.checkClass(icon, 'ui-igcheckbox-normal-on');
	assert.equal(checkbox.attr('data-chk'), 'on', 'The checkstate of the checkbox is rendered as on');
	checkbox.children('span').click();
	$.ig.TestUtil.checkClass(checkbox, 'ui-state-default');
	$.ig.TestUtil.checkClass(checkbox, 'ui-corner-all');
	$.ig.TestUtil.checkClass(checkbox, 'ui-igcheckbox-normal');
	icon = checkbox.children('span');
	$.ig.TestUtil.checkClass(icon, 'ui-icon');
	$.ig.TestUtil.checkClass(icon, 'ui-icon-check');
	$.ig.TestUtil.checkClass(icon, 'ui-igcheckbox-normal-off');
	assert.equal(checkbox.attr('data-chk'), 'off', 'The checkstate did not return to off');
	node = $('#tree14').igTree('nodeByPath', '0');
	node.children('span[data-role=checkbox]').children('span').click();
	checkbox = node.children('[data-role=checkbox]');
	assert.equal(checkbox.attr('data-chk'), 'off', 'The checkstate did not return to off');
});
QUnit.test(testId_14, function (assert) {
	var node = $('#tree14').igTree('nodeByPath', '0'), checkbox = node.children('[data-role=checkbox]');
	assert.expect(22);
	$('#tree14').igTree('option', 'checkboxMode', 'triState');
	assert.equal(checkbox.attr('data-chk'), 'off', 'The checkstate of the checkbox is rendered as on');
	checkbox.children('span').click();
	$.ig.TestUtil.checkClass(checkbox, 'ui-state-default');
	$.ig.TestUtil.checkClass(checkbox, 'ui-corner-all');
	$.ig.TestUtil.checkClass(checkbox, 'ui-igcheckbox-normal');
	var icon = checkbox.children('span');
	$.ig.TestUtil.checkClass(icon, 'ui-icon');
	$.ig.TestUtil.checkClass(icon, 'ui-icon-check');
	$.ig.TestUtil.checkClass(icon, 'ui-igcheckbox-normal-on');
	assert.equal(checkbox.attr('data-chk'), 'on', 'The checkstate did not toggle to on');
	checkbox.children('span').mouseover();
	$.ig.TestUtil.checkClass(checkbox, 'ui-state-hover', "Hover class was not applied");
	checkbox.children('span').mouseout();
	assert.ok(!checkbox.hasClass('ui-state-hover'), "Hover class was not removed");
	var selector = $('#tree14').igTree('checkedNodes');
	assert.equal(selector.length, 6, 'The checkboxes did not cascade ot the API method returned wrong');
	node = $('#tree14').igTree('nodeByPath', '0_1');
	checkbox = node.children('[data-role=checkbox]');
	icon = checkbox.children('span');
	checkbox.children('span').click();
	selector = $('#tree14').igTree('checkedNodes');
	assert.equal(selector.length, 4, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('uncheckedNodes');
	assert.equal(selector.length, 1, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('partiallyCheckedNodes');
	assert.equal(selector.length, 1, 'The checkboxes did not cascade ot the API method returned wrong');
	node = $('#tree14').igTree('nodeByPath', '0');
	checkbox = node.children('[data-role=checkbox]');
	icon = checkbox.children('span');
	$.ig.TestUtil.checkClass(icon, 'ui-icon');
	$.ig.TestUtil.checkClass(icon, 'ui-icon-check');
	$.ig.TestUtil.checkClass(icon, 'ui-igcheckbox-normal-on');
	$.ig.TestUtil.checkClass(icon, 'ui-state-disabled');
	checkbox.children('span').click();
	selector = $('#tree14').igTree('uncheckedNodes');
	assert.equal(selector.length, 6, 'The checkboxes did not cascade ot the API method returned wrong');
	node.children('span[data-role=checkbox]').children('span').click();
	node = $('#tree14').igTree('nodeByPath', '0_0_0');
	node.children('span[data-role=checkbox]').children('span').click();
	selector = $('#tree14').igTree('checkedNodes');
	assert.equal(selector.length, 3, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('uncheckedNodes');
	assert.equal(selector.length, 1, 'The checkboxes did not cascade ot the API method returned wrong');
	selector = $('#tree14').igTree('partiallyCheckedNodes');
	assert.equal(selector.length, 2, 'The checkboxes did not cascade ot the API method returned wrong');
});
QUnit.test(testId_15, function (assert) {
	var nodePath = '0', node = $('#tree12').igTree('nodeByPath', nodePath), anchor = node.children('a'), selectedNode = $('#tree12').igTree('selectedNode');
	assert.expect(33);
	assert.ok(anchor.length > 0, 'Anchor is not properly returned.');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'isSelected returned wrong value');
	assert.equal(selectedNode.path, null, "selectedNode returned wrong");
	assert.equal(selectedNode.element, null, "selectedNode returned wrong");
	assert.equal(selectedNode.data, null, "selectedNode returned wrong");
	assert.equal(selectedNode.binding, null, "selectedNode returned wrong");
	anchor.click();
	var selected = $('#tree12').igTree('selectedNode');
	assert.ok($('#tree12').igTree('isSelected', selected.element), 'isSelected returned wrong value');
	$.ig.TestUtil.checkClass(anchor, 'ui-state-active');
	assert.equal(selected.path, selected.element.attr('data-path'), 'Selected node object is corrupted');
	assert.equal(nodePath, selected.path, 'A different than the expected node has been selected');
	var bindings = $('#tree12').igTree('option', 'bindings');
	assert.equal(selected.binding.valueKey, bindings.valueKey, 'Binding value key does not match');
	assert.equal(selected.binding.textKey, bindings.textKey, 'Binding value key does not match');
	assert.equal(selected.binding.imageUrlKey, bindings.imageUrlKey, 'Binding value key does not match');
	assert.equal(selected.binding.navigateUrlKey, bindings.navigateUrlKey, 'Binding value key does not match');
	assert.equal(selected.binding.childDataProperty, bindings.childDataProperty, 'Binding value key does not match');
	assert.ok(typeof(selected.data[bindings.childDataProperty]) === 'object', 'Child data is not retrieved properly');
	assert.equal(selected.data[bindings.textKey], 'node 1', 'Text in the data is wrong');
	assert.equal(selected.data[bindings.imageUrlKey], 'images/folder.gif', 'Text in the data is wrong');
	nodePath = '1';
	var node2 = $('#tree12').igTree('nodeByPath', nodePath);
	assert.ok(!$('#tree12').igTree('isSelected', node2), 'isSelected returned wrong value');
	node2.children('a').click();
	assert.notEqual(anchor.hasClass('ui-state-active'), true, 'Node 1 did not deselect on new selection');
	anchor = node2.children('a');
	$.ig.TestUtil.checkClass(anchor, 'ui-state-active');
	assert.ok($('#tree12').igTree('isSelected', node2), 'isSelected returned wrong value');
	selected = $('#tree12').igTree('selectedNode');
	assert.equal(nodePath, selected.path, 'A different than the expected node has been selected');
	assert.ok($('#tree12').igTree('isSelected', selected.element), 'isSelected returned wrong value');
	node2.children('a').click();
	assert.ok($('#tree12').igTree('isSelected', node2), 'isSelected returned wrong value');
	$.ig.TestUtil.checkClass(anchor, 'ui-state-active');
	selected = $('#tree12').igTree('selectedNode');
	assert.equal(nodePath, selected.path, 'Node 2 deselected upon performing select');
	$('#tree12').igTree('deselect', node2);
	assert.ok(!$('#tree12').igTree('isSelected', node2), 'isSelected returned wrong value');
	assert.notEqual(anchor.hasClass('ui-state-active'), true, 'Node 1 did not deselect on new selection');
	selected = $('#tree12').igTree('selectedNode');
	assert.equal(selected.path, null, 'Path for selection did not reset');
	assert.equal(selected.element, null, 'Element for selection did not reset');
	assert.equal(selected.data, null, 'Data for selection did not reset');
	assert.equal(selected.binding, null, 'Binding for selection did not reset');
});
QUnit.test(testId_16, function (assert) {
	var node = $('#tree12').igTree('nodeByPath', '0'), anchor = node.children('a');
	assert.expect(6);
	assert.ok(!anchor.hasClass('ui-state-hover'), 'Root item has hover style applied before being hovered');
	anchor.mouseover();
	$.ig.TestUtil.checkClass(anchor, 'ui-state-hover');
	anchor.mouseout();
	assert.ok(!anchor.hasClass('ui-state-hover'), 'Root item did not remove style on unhover');
	node = $('#tree12').igTree('nodeByPath', '1'), anchor = node.children('a');
	assert.ok(!anchor.hasClass('ui-state-hover'), 'Root item has hover style applied before being hovered');
	anchor.mouseover();
	$.ig.TestUtil.checkClass(anchor, 'ui-state-hover');
	anchor.mouseout();
	assert.ok(!anchor.hasClass('ui-state-hover'), 'Root item did not remove style on unhover');
});
QUnit.test(testId_17, function (assert) {
	var node = $('#tree12').igTree('nodeByPath', '0'), ev = jQuery.Event("keydown");
	assert.expect(52);
	assert.ok(!$('#tree12').igTree('isExpanded', node), 'Node did not expand when hitting the right arrow key');
	ev.keyCode = $.ui.keyCode.RIGHT;
	$(node).children('a').trigger(ev);
	assert.ok($.ig.TestUtil.boolParse($('#tree12').igTree('isExpanded', node)), 'Node did not expand when hitting the right arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.RIGHT;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_0');
	assert.ok($('#tree12').igTree('isSelected', node), 'Node did not select when hitting the right arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.LEFT;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0');
	assert.ok($('#tree12').igTree('isSelected', node), 'Node did not select when hitting the left arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.LEFT;
	$(node).children('a').trigger(ev);
	assert.ok(!$('#tree12').igTree('isExpanded', node), 'Node did not collapse when hitting the left arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.RIGHT;
	$(node).children('a').trigger(ev);
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_0');
	assert.ok($('#tree12').igTree('isSelected', node), 'Node did not select when hitting the down arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_1');
	assert.ok($('#tree12').igTree('isSelected', node), 'Node did not select when hitting the down arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_2');
	assert.ok($('#tree12').igTree('isSelected', node), 'Node did not select when hitting the down arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_3');
	assert.ok($('#tree12').igTree('isSelected', node), 'Node did not select when hitting the down arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4');
	assert.ok($('#tree12').igTree('isSelected', node), 'Node did not select when hitting the down arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '1');
	assert.ok($('#tree12').igTree('isSelected', node), 'Node did not select when hitting the down arrow key');
	$('#tree12').igTree('expand', $('#tree12').igTree('nodeByPath', '0_4'));
	$('#tree12').igTree('expand', $('#tree12').igTree('nodeByPath', '0_4_4'));
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.UP;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_4_4');
	assert.ok($('#tree12').igTree('isSelected', node), 'Previous node is not selected when hitting the up arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.UP;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_4_3');
	assert.ok($('#tree12').igTree('isSelected', node), 'Previous node is not selected when hitting the up arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.UP;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_4_2');
	assert.ok($('#tree12').igTree('isSelected', node), 'Previous node is not selected when hitting the up arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.UP;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_4_1');
	assert.ok($('#tree12').igTree('isSelected', node), 'Previous node is not selected when hitting the up arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.UP;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_4_0');
	assert.ok($('#tree12').igTree('isSelected', node), 'Previous node is not selected when hitting the up arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.UP;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_4');
	assert.ok($('#tree12').igTree('isSelected', node), 'Previous node is not selected when hitting the up arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.LEFT;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_4');
	assert.ok(!$('#tree12').igTree('isExpanded', node), 'Previous node is not selected when hitting the up arrow key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.END;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '5');
	assert.ok($('#tree12').igTree('isSelected', node), 'Last node is not selected when hitting the END key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	$(node).children('a').trigger(ev);
	assert.ok($('#tree12').igTree('isSelected', node), 'Last node deselected when hitting the DOWN key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.HOME;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0');
	assert.ok($('#tree12').igTree('isSelected', node), 'First node is not selected when hitting the HOME key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.UP;
	$(node).children('a').trigger(ev);
	assert.ok($('#tree12').igTree('isSelected', node), 'First node deselected when hitting the UP key');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_0');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.LEFT;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok($('#tree12').igTree('isSelected', node), 'Node got deselected.');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.RIGHT;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_0');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_1');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_2');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_3');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_0');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_1');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_2');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_3');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_4');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.DOWN;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '1');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.UP;
	ev.ctrlKey = true;
	$(node).children('a').trigger(ev);
	node = $('#tree12').igTree('nodeByPath', '0_4_4');
	$.ig.TestUtil.checkClass(node.children('a'), 'ui-state-focus', 'Node did not get focused holding the ctrl key');
	assert.ok(!$('#tree12').igTree('isSelected', node), 'Node got selected in addition to activating with the ctrl key held');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.NUMPAD_ADD;
	$(node).children('a').trigger(ev);
	assert.ok($.ig.TestUtil.boolParse($('#tree12').igTree('isExpanded', node)), 'Node did not expand after hitting the plus key on the numpad');
	ev = jQuery.Event("keydown");
	ev.keyCode = $.ui.keyCode.NUMPAD_SUBTRACT;
	$(node).children('a').trigger(ev);
	assert.ok(!$('#tree12').igTree('isExpanded', node), 'Node did not collapse after hitting the minus key on the numpad');
});
QUnit.test(testId_18, function (assert) {
	var node = $('#tree14').igTree('nodeByPath', '0'), ev = jQuery.Event('keydown');
	assert.expect(8);
	ev.keyCode = $.ui.keyCode.SPACE;
	$('#tree14').igTree('option', 'checkboxMode', 'triState');
	node.children('a').trigger(ev);
	assert.ok(!$('#tree14').igTree('isChecked', node), 'The checkbox did not uncheck');
	node = $('#tree14').igTree('nodeByPath', '0_0');
	ev = jQuery.Event('keydown');
	ev.keyCode = $.ui.keyCode.SPACE;
	node.children('a').trigger(ev);
	assert.ok($('#tree14').igTree('isChecked', node), 'The checkbox did not get checked');
	assert.ok($('#tree14').igTree('isChecked', $('#tree14').igTree('nodeByPath', '0_0_0')), 'The checkbox did not cascade down');
	assert.ok($('#tree14').igTree('isChecked', $('#tree14').igTree('nodeByPath', '0_0_1')), 'The checkbox did not fully cascade down');
	assert.ok($('#tree14').igTree('partiallyCheckedNodes').length === 1, 'The checkbox did not fully cascade down');
	node = $('#tree14').igTree('nodeByPath', '0_0_0');
	ev = jQuery.Event('keydown');
	ev.keyCode = $.ui.keyCode.SPACE;
	node.children('a').trigger(ev);
	assert.ok(!$('#tree14').igTree('isChecked', node), 'The checkbox did not get unchecked');
	assert.ok(!$('#tree14').igTree('isChecked', $('#tree14').igTree('nodeByPath', '0_0')), 'The checkbox did not cascade up');
	assert.ok($('#tree14').igTree('partiallyCheckedNodes').length === 2, 'The checkbox did not fully cascade down');
});
QUnit.test(testId_19, function (assert) {
	var tree = $('<div></div>').appendTo($(document.body));
	assert.expect(4);
	tree.igTree({
		dataSource: {
			text: "Text",
			value: "Value",
			children: [
				{ text: "text", value: "value1" }
			]
		},
		bindings: {
			textKey: "text",
			valueKey: "value",
			childDataProperty: 'children'
		}
	});
	assert.equal(tree.find('li[data-role=node]').length, 2, "The tree did not render with an object data source");
	var data = tree.igTree('option', 'dataSource');
	assert.equal(data.root().data()[0].text, 'Text', "The igTree data did not match");
	assert.equal(tree.igTree('nodeDataFor', '0').value, "Value", "The igTree nodeDataFor returned wrong");
	assert.equal(tree.igTree('nodeDataFor', '0_0').value, "value1", "The igTree nodeDataFor returned wrong");
	tree.igTree('destroy');
	tree.remove();
});

/* ***************** END igTree Rendering ***************** */

/* ***************** igTree databinding ***************** */

testId_1 = "igTree binding to JSON";
testId_2 = "igTree hierarchical bindings";
testId_3 = "igTree hierarchical JSON data retrieval";
testId_4 = "igTree hierarchical JSON load on demand with all content on client";
testId_5 = "igTree and nodeContentTemplates in hierarchical bindings";
testId_6 = "igTree node retrieval API methods";
testId_7 = "igTree bug #203489 applyChangesToNode does not pesist node state for selection and focus.";
testId_8 = "igTree hierarchical JSON remote load on demand (Bug 217440 : Child populate with responseDataKey)";
testId_9 = "igTree binding to XML";
testId_10 = "igTree binding to data that contains apostrophes";

QUnit.test(testId_1, function (assert) {
	var nodeCount = $('#tree2').find('li[data-role=node]').length;
	assert.expect(16)
	assert.equal(nodeCount, 32, 'Tree did not render as many nodes as there are items in the data source');
	var binding = $('#tree2').igTree('option', 'bindings'), dataEntry = results[0];
	assert.ok(binding.hasOwnProperty('textKey'), 'Binding does not contain a text key');
	assert.ok(binding.hasOwnProperty('childDataProperty'), 'Binding does not contain a child data property');
	assert.ok(dataEntry.hasOwnProperty(binding.textKey), 'The data does not contain property: ' + binding.textKey);
	assert.ok(dataEntry.hasOwnProperty(binding.childDataProperty), 'The data does not contain property: ' + binding.childDataProperty);
	var data = $('#tree2').igTree('option', 'dataSource').root().data();
	assert.equal(data.length, results.length, 'The root level item length does not match');
	for (var i = 0; i < data.length; i++) {
		assert.equal(data[i][binding.textKey], results[i][binding.textKey], 'Data does not match the original data');
	}
	var node = $("#tree2").igTree("nodeByPath", "0");
	assert.equal($("#tree2").igTree("isExpanded", node), true, "The node is not originally expanded");
	var expandedKey = "__expanded__",
		checkedKey = "__checked__",
		nodeData = $("#tree2").igTree("nodeDataFor", "0");
	assert.equal(nodeData[expandedKey], true, "The data was not correct");
	assert.equal(nodeData[checkedKey], "on", "The data was not correct");
	assert.equal($("#tree2").igTree("checkState", node), "on", "The node is not originally expanded");
	assert.equal(node.children("a").attr("target"), "_blank", "The node is not with the correct target attribute.");
});
QUnit.test(testId_9, function (assert) {
	assert.expect(4);
	var tree = $("<div></div>").appendTo(document.body).igTree({
		checkboxMode: 'triState',
		singleBranchExpand: true,
		dataSource: loadXMLDoc('data/TreeSampleData.xml'),
		dataSourceType: 'xml',
		initialExpandDepth: 1,
		pathSeparator: '.',
		bindings: {
			textKey: 'Text',
			textXPath: '@Text',
			valueKey: 'Value',
			valueXPath: '@Value',
			navigateUrlKey: "NavigateUrl",
			navigateUrlXPath: "@NavigateUrl",
			targetKey: "Target",
			imageUrlKey: 'ImageUrl',
			imageUrlXPath: '@ImageUrl',
			childDataProperty: 'Folder',
			childDataXPath: 'Folder',
			searchFieldXPath: 'Folders'
		}
	});
	assert.equal(tree.find('li[data-role=node]').length, 38, 'Tree did not render as many nodes as there are items in the data source');
	var node = tree.igTree("nodeByPath", "0");
	assert.equal(tree.igTree("isExpanded", node), true, "The node is not originally expanded");
	var binding = tree.igTree('option', 'bindings');
	assert.ok(binding.hasOwnProperty('childDataXPath'), 'Binding does not contain a childDataXPath');
	assert.ok(binding.hasOwnProperty('searchFieldXPath'), 'Binding does not contain a searchFieldXPath');
	tree.igTree("destroy");
	tree.remove();
});
QUnit.test(testId_2, function (assert) {
	assert.expect(39);
	var nodeCount = $('#tree3').find('li[data-role=node]').length;
	assert.equal(nodeCount, 36, 'Tree did not render as many nodes as there are items in the data source');
	var bindings = $('#tree3').igTree('option', 'bindings');
	var toCheck = $('#tree3').data('igTree');
	assert.ok(bindings.hasOwnProperty('textKey'), 'Text key is not present on the first level of bindings');
	assert.equal(bindings.textKey, 'Text', 'Text key did not match');
	assert.ok(bindings.hasOwnProperty('valueKey'), 'Value key is not present on the first level of bindings');
	assert.equal(bindings.valueKey, 'Value', 'Value key did not match');
	assert.ok(bindings.hasOwnProperty('imageUrlKey'), 'Image url key is not present on the first level of bindings');
	assert.equal(bindings.imageUrlKey, 'ImageUrl', 'Navigate url key did not match');
	assert.ok(bindings.hasOwnProperty('navigateUrlKey'), 'Navigate url key is not present on the first level of bindings');
	assert.equal(bindings.navigateUrlKey, 'URL', 'Navigate url key did not match');
	assert.ok(bindings.hasOwnProperty('childDataProperty'), 'Child data property is not present on the first level of bindings');
	assert.equal(bindings.childDataProperty, 'Children', 'Child data property did not match');
	assert.ok(bindings.bindings.hasOwnProperty('textKey'), 'Text key is not present on the first level of bindings');
	assert.equal(bindings.bindings.textKey, 'Text1', 'Text key did not match');
	assert.ok(bindings.bindings.hasOwnProperty('valueKey'), 'Value key is not present on the first level of bindings');
	assert.equal(bindings.bindings.valueKey, 'Value1', 'Value key did not match');
	assert.ok(bindings.bindings.hasOwnProperty('imageUrlKey'), 'Image url key is not present on the first level of bindings');
	assert.equal(bindings.bindings.imageUrlKey, 'ImageUrl1', 'Navigate url key did not match');
	assert.ok(bindings.bindings.hasOwnProperty('navigateUrlKey'), 'Navigate url key is not present on the first level of bindings');
	assert.equal(bindings.bindings.navigateUrlKey, 'URL1', 'Navigate url key did not match');
	assert.ok(bindings.bindings.hasOwnProperty('childDataProperty'), 'Child data property is not present on the first level of bindings');
	assert.equal(bindings.bindings.childDataProperty, 'Children1', 'Child data property did not match');
	assert.ok(bindings.bindings.bindings.hasOwnProperty('textKey'), 'Text key is not present on the first level of bindings');
	assert.equal(bindings.bindings.bindings.textKey, 'Text2', 'Text key did not match');
	assert.ok(bindings.bindings.bindings.hasOwnProperty('valueKey'), 'Value key is not present on the first level of bindings');
	assert.equal(bindings.bindings.bindings.valueKey, 'Value2', 'Value key did not match');
	assert.ok(bindings.bindings.bindings.hasOwnProperty('imageUrlKey'), 'Image url key is not present on the first level of bindings');
	assert.equal(bindings.bindings.bindings.imageUrlKey, 'ImageUrl2', 'Navigate url key did not match');
	assert.ok(bindings.bindings.bindings.hasOwnProperty('navigateUrlKey'), 'Navigate url key is not present on the first level of bindings');
	assert.equal(bindings.bindings.bindings.navigateUrlKey, 'URL2', 'Navigate url key did not match');
	assert.ok(bindings.bindings.bindings.hasOwnProperty('childDataProperty'), 'Child data property is not present on the first level of bindings');
	assert.equal(bindings.bindings.bindings.childDataProperty, 'Children2', 'Child data property did not match');
	assert.ok(bindings.bindings.bindings.bindings.hasOwnProperty('textKey'), 'Text key is not present on the first level of bindings');
	assert.equal(bindings.bindings.bindings.bindings.textKey, 'Text3', 'Text key did not match');
	assert.ok(bindings.bindings.bindings.bindings.hasOwnProperty('valueKey'), 'Value key is not present on the first level of bindings');
	assert.equal(bindings.bindings.bindings.bindings.valueKey, 'Value3', 'Value key did not match');
	assert.equal(toCheck._retrieveCurrentDepthBinding(0), bindings, 'Bindings did not match when retrieved internally');
	assert.equal(toCheck._retrieveCurrentDepthBinding(1), bindings.bindings, 'Bindings did not match when retrieved internally');
	assert.equal(toCheck._retrieveCurrentDepthBinding(2), bindings.bindings.bindings, 'Bindings did not match when retrieved internally');
	assert.equal(toCheck._retrieveCurrentDepthBinding(3), bindings.bindings.bindings.bindings, 'Bindings did not match when retrieved internally');
});
QUnit.test(testId_3, function (assert) {
	var data = $('#tree3').igTree('nodeDataFor', '0'), binding = $('#tree3').igTree('option', 'bindings');
	assert.expect(40);
	assert.ok(data.hasOwnProperty(binding.textKey), 'Text is missing in the data');
	assert.ok(data.hasOwnProperty(binding.valueKey), 'Value is missing in the data');
	assert.ok(data.hasOwnProperty(binding.imageUrlKey), 'Image url is missing in the data');
	assert.ok(data.hasOwnProperty(binding.navigateUrlKey), 'Navigate url is missing in the data');
	assert.ok(data.hasOwnProperty(binding.childDataProperty), 'Child data property is missing in the data');
	assert.equal(data[binding.textKey], 'Unit testing', 'Text in the data does not match');
	assert.equal(data[binding.valueKey], '0', 'Value in the data does not match');
	assert.equal(data[binding.imageUrlKey], 'images/book.png', 'Image url in the data does not match');
	assert.equal(data[binding.navigateUrlKey], 'http://google.com', 'Navigate url in the data does not match');
	assert.ok(typeof(data[binding.childDataProperty]) === 'object', 'Child data is not an object.');
	data = $('#tree3').igTree('nodeDataFor', '0_0'), binding = binding.bindings;
	assert.ok(data.hasOwnProperty(binding.textKey), 'Text is missing in the data');
	assert.ok(data.hasOwnProperty(binding.valueKey), 'Value is missing in the data');
	assert.ok(data.hasOwnProperty(binding.imageUrlKey), 'Image url is missing in the data');
	assert.ok(data.hasOwnProperty(binding.navigateUrlKey), 'Navigate url is missing in the data');
	assert.ok(data.hasOwnProperty(binding.childDataProperty), 'Child data property is missing in the data');
	assert.equal(data[binding.textKey], 'Unit testing1', 'Text in the data does not match');
	assert.equal(data[binding.valueKey], '1', 'Value in the data does not match');
	assert.equal(data[binding.imageUrlKey], 'images/book_add.png', 'Image url in the data does not match');
	assert.equal(data[binding.navigateUrlKey], 'http://infragistics.com', 'Navigate url in the data does not match');
	assert.ok(typeof(data[binding.childDataProperty]) === 'object', 'Child data is not an object.');
	data = $('#tree3').igTree('nodeDataFor', '0_0_0'), binding = binding.bindings;
	assert.ok(data.hasOwnProperty(binding.textKey), 'Text is missing in the data');
	assert.ok(data.hasOwnProperty(binding.valueKey), 'Value is missing in the data');
	assert.ok(data.hasOwnProperty(binding.imageUrlKey), 'Image url is missing in the data');
	assert.ok(data.hasOwnProperty(binding.navigateUrlKey), 'Navigate url is missing in the data');
	assert.ok(data.hasOwnProperty(binding.childDataProperty), 'Child data property is missing in the data');
	assert.equal(data[binding.textKey], 'Unit testing2', 'Text in the data does not match');
	assert.equal(data[binding.valueKey], '2', 'Value in the data does not match');
	assert.equal(data[binding.imageUrlKey], 'images/coins.png', 'Image url in the data does not match');
	assert.equal(data[binding.navigateUrlKey], '', 'Navigate url in the data does not match');
	var node = $('#tree3').igTree('nodeByPath', '0_0_0');
	assert.equal(node.children("a").attr("href"), '#', 'Navigate url in the node was not rendered correctly.');
	assert.ok(typeof(data[binding.childDataProperty]) === 'object', 'Child data is not an object.');
	data = $('#tree3').igTree('nodeDataFor', '0_0_0_0'), binding = binding.bindings;
	assert.ok(data.hasOwnProperty(binding.textKey), 'Text is missing in the data');
	assert.ok(data.hasOwnProperty(binding.valueKey), 'Value is missing in the data');
	assert.ok(!binding.hasOwnProperty('childDataProperty'), 'Child data exists in a binding where it shouldnt');
	assert.equal(data[binding.textKey], 'Unit testing3', 'Text in the data does not match');
	assert.equal(data[binding.valueKey], '3', 'Value in the data does not match');
	data = $('#tree3').igTree('nodeDataFor', '1'), binding = $('#tree3').igTree('option', 'bindings');
	assert.ok(data.hasOwnProperty(binding.textKey), 'Text is missing in the data');
	assert.ok(data.hasOwnProperty(binding.childDataProperty), 'Child data property is missing in the data');
	assert.equal(data[binding.textKey], 'Unit testing', 'Text in the data does not match');
	assert.ok(typeof(data[binding.childDataProperty]) === 'object', 'Child data is not an object.');
});
QUnit.test(testId_4, function (assert) {
	var nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.expect(56);
	assert.equal(nodeCount, 5, 'A different than the expected number of nodes rendered initially');
	assert.throws(function () {$('#tree4').igTree('toggleCheckstate');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling toggleCheckstate without a parameter');
	assert.throws(function () {$('#tree4').igTree('toggle');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling toggle without a parameter');
	assert.throws(function () {$('#tree4').igTree('expand');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling expand without a parameter');
	assert.throws(function () {$('#tree4').igTree('collapse');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling collapse without a parameter');
	assert.throws(function () {$('#tree4').igTree('parentNode');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling parentNode without a parameter');
	assert.throws(function () {$('#tree4').igTree('select');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling select without a parameter');
	assert.throws(function () {$('#tree4').igTree('deselect');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling deselect without a parameter');
	assert.throws(function () {$('#tree4').igTree('children');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling children without a parameter');
	assert.throws(function () {$('#tree4').igTree('childrenByPath');}, function (err) { return err.message === $.ig.Tree.locale.incorrectPath + undefined; }, 'An error was not correctly thrown when calling childrenByPath without a parameter');
	assert.throws(function () {$('#tree4').igTree('isSelected');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling isSelected without a parameter');
	assert.throws(function () {$('#tree4').igTree('isExpanded');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling isExpanded without a parameter');
	assert.throws(function () {$('#tree4').igTree('isChecked');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling isChecked without a parameter');
	assert.throws(function () {$('#tree4').igTree('checkState');}, function (err) { return err.message === $.ig.Tree.locale.incorrectNodeObject; }, 'An error was not correctly thrown when calling checkState without a parameter');
	var node = $('#tree4').igTree('nodeByPath', '0');
	assert.ok(!$('#tree4').igTree('isChecked', node), 'API returned checked');
	assert.ok(!$('#tree4').igTree('isExpanded', node), 'API returned expanded');
	$('#tree4').igTree('toggleCheckstate', node);
	assert.ok($('#tree4').igTree('isChecked', node), 'Node did not check');
	$('#tree4').igTree('expandToNode', '0_0');
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', node)), 'Node did not mark as expanded');
	nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.equal(nodeCount, 7, 'A different than the expected number of nodes rendered after expand');
	node = $('#tree4').igTree('nodeByPath', '0_0');
	assert.ok($('#tree4').igTree('isChecked', node), 'Node did not render checked');
	assert.ok(!$('#tree4').igTree('isExpanded', node), 'API returned expanded');
	$('#tree4').igTree('toggle', node);
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', node)), 'Node did not mark as expanded');
	nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.equal(nodeCount, 9, 'A different than the expected number of nodes rendered after expand');
	node = $('#tree4').igTree('nodeByPath', '0_0_0');
	assert.ok($('#tree4').igTree('isChecked', node), 'Node did not render checked');
	node = $('#tree4').igTree('nodeByPath', '0_1');
	assert.ok($('#tree4').igTree('isChecked', node), 'Node did not render checked');
	assert.ok(!$('#tree4').igTree('isExpanded', node), 'API returned expanded');
	node = $('#tree4').igTree('nodeByPath', '0_1');
	assert.ok($('#tree4').igTree('isChecked', node), 'Node did not render checked');
	$('#tree4').igTree('toggle', node);
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', node)), 'Node did not mark as expanded');
	nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.equal(nodeCount, 11, 'A different than the expected number of nodes rendered after expand');
	node = $('#tree4').igTree('nodeByPath', '0_1_0');
	assert.ok($('#tree4').igTree('isChecked', node), 'Node did not render checked');
	node = $('#tree4').igTree('nodeByPath', '1');
	assert.ok(!$('#tree4').igTree('isExpanded', node), 'API returned expanded');
	$('#tree4').igTree('toggle', node);
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', node)), 'Node did not mark as expanded');
	nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.equal(nodeCount, 13, 'A different than the expected number of nodes rendered after expand');
	node = $('#tree4').igTree('nodeByPath', '1_0');
	assert.ok(!$('#tree4').igTree('isExpanded', node), 'API returned expanded');
	$('#tree4').igTree('toggle', node);
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', node)), 'Node did not mark as expanded');
	nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.equal(nodeCount, 15, 'A different than the expected number of nodes rendered after expand');
	node = $('#tree4').igTree('nodeByPath', '1_1');
	assert.ok(!$('#tree4').igTree('isExpanded', node), 'API returned expanded');
	$('#tree4').igTree('expand', node);
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', node)), 'Node did not mark as expanded');
	nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.equal(nodeCount, 17, 'A different than the expected number of nodes rendered after expand');
	node = $('#tree4').igTree('nodeByPath', '2');
	assert.ok(!$('#tree4').igTree('isExpanded', node), 'API returned expanded');
	$('#tree4').igTree('expandToNode', '2_0', true);
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', node)), 'Node did not mark as expanded');
	nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.equal(nodeCount, 19, 'A different than the expected number of nodes rendered after expand');
	node = $('#tree4').igTree('nodeByPath', '2_0');
	assert.ok(!$('#tree4').igTree('isExpanded', node), 'API returned expanded');
	assert.ok($('#tree4').igTree('isSelected', node), 'API returned not selected');
	$('#tree4').igTree('toggle', node);
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', node)), 'Node did not mark as expanded');
	nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.equal(nodeCount, 21, 'A different than the expected number of nodes rendered after expand');
	node = $('#tree4').igTree('nodeByPath', '2_1');
	assert.ok(!$('#tree4').igTree('isExpanded', node), 'API returned expanded');
	$('#tree4').igTree('expand', node);
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', node)), 'Node did not mark as expanded');
	nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.equal(nodeCount, 23, 'A different than the expected number of nodes rendered after expand');
	node = $('#tree4').igTree('nodeByPath', '3');
	assert.ok(!$('#tree4').igTree('isExpanded', node), 'API returned expanded');
	$('#tree4').igTree('expand', node);
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', node)), 'Node did not mark as expanded');
	nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.equal(nodeCount, 25, 'A different than the expected number of nodes rendered after expand');
	$('#tree4').igTree('expandToNode', '3_0_1', true);
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', $('#tree4').igTree('nodeByPath', '3'))), 'Node did not mark as expanded');
	assert.ok($.ig.TestUtil.boolParse($('#tree4').igTree('isExpanded', $('#tree4').igTree('nodeByPath', '3_0'))), 'Node did not mark as expanded');
	assert.ok($('#tree4').igTree('isSelected', $('#tree4').igTree('nodeByPath', '3_0_1')), 'API returned not selected');
	nodeCount = $('#tree4').find('li[data-role=node]').length;
	assert.equal(nodeCount, 27, 'A different than the expected number of nodes rendered after expand');
});
QUnit.test(testId_5, function (assert) {
	var node = $('#tree5').igTree('nodeByPath', '0'), anchor = node.children('a');
	assert.expect(27);
	assert.equal(anchor.attr("href"), "http://google.com", "The template href was not rendered.");
	assert.equal(anchor.attr("target"), "_blank", "The template href was not rendered.");
	assert.ok(anchor.has('span'), 'First level template did not render');
	assert.equal(anchor.children('span').html(), 'Unit testing: ');
	assert.equal(anchor.attr("target"), "_blank", 'The target attribute was not rendered.');
	$("#tree5").igTree("applyChangesToNode", node, {Text: "Changed", __expanded__: true});
	anchor = node.children('a');
	assert.ok(anchor.has('span'), 'First level template did not render');
	assert.equal(anchor.children('span').html(), 'Changed: ');
	assert.equal($("#tree5").igTree("isExpanded", node), true, "The expanded key did not take effect.");
	node = $('#tree5').igTree('nodeByPath', '0_0');
	anchor = node.children('a');
	assert.equal(anchor.attr("href"), "http://somehref", "The template href was not rendered.");
	assert.equal(anchor.attr("target"), "haha", "The template target was not rendered.");
	assert.ok(anchor.has('font'), 'Second level template did not render');
	assert.equal(anchor.children('font').html(), 'Unit testing1: ');
	$("#tree5").igTree("applyChangesToNode", node, {Text1: "Changed1", __checked__: "on"});
	anchor = node.children('a');
	assert.ok(anchor.has('font'), 'Second level template did not render');
	assert.equal(anchor.children('font').html(), 'Changed1: ');
	assert.equal($("#tree5").igTree("checkState", node), "on", "The checked key did not take effect.");
	node = $('#tree5').igTree('nodeByPath', '0_0_0');
	anchor = node.children('a');
	assert.equal(anchor.attr("href"), "#", "The template href was not rendered.");
	assert.equal(anchor.attr("target"), "_self", "The template href was not rendered.");
	assert.equal(anchor.children('font').length, 2, 'Third level template did not render');
	assert.equal(anchor.children('font').first().html(), 'Unit testing2: ');
	assert.equal(anchor.children('font').last().html(), '2');
	$("#tree5").igTree("applyChangesToNode", node, {Text2: "Changed2", Value2: 2});
	anchor = node.children('a');
	assert.equal(anchor.children('font').length, 2, 'Third level template did not render');
	assert.equal(anchor.children('font').first().html(), 'Changed2: ');
	assert.equal(anchor.children('font').last().html(), '2');
	node = $('#tree5').igTree('nodeByPath', '0_0_0_0');
	anchor = node.children('a');
	assert.equal(anchor.children().length, 0, 'Third level template did not render');
	assert.equal(anchor.html(), 'Unit testing3');
	$("#tree5").igTree("applyChangesToNode", node, {Text3: "Changed3"});
	anchor = node.children('a');
	assert.equal(anchor.children().length, 0, 'Third level template did not render');
	assert.equal(anchor.html(), 'Changed3');
});
QUnit.test(testId_6, function (assert) {
	// parentNode method
	var node = $('#tree2').igTree('nodeByPath', '0_0'), parentNode = $('#tree2').igTree('parentNode', node);
	assert.expect(60);
	assert.ok(parentNode.length === 1, 'parentNode method returned no elements when it should have returned one');
	assert.equal(parentNode.attr('data-path'), '0', 'The returned parent node path is incorrect');
	node = $('#tree2').igTree('nodeByPath', '0_0_0'), parentNode = $('#tree2').igTree('parentNode', node);
	assert.ok(parentNode.length === 1, 'parentNode method returned no elements when it should have returned one');
	assert.equal(parentNode.attr('data-path'), '0_0', 'The returned parent node path is incorrect');
	node = $('#tree2').igTree('nodeByPath', '0'), parentNode = $('#tree2').igTree('parentNode', node);
	assert.ok(parentNode === null, 'parentNode returned an element as parent to a root node');
	node = $('#tree2').igTree('nodeByPath', '0_1_0'), parentNode = $('#tree2').igTree('parentNode', node);
	assert.ok(node.length === 0, 'nodeByPath returned a node when there is no such in the tree');
	assert.ok(parentNode === null, 'parentNode returned an element as parent to a root node');
	// nodesByValue method
	node = $('#tree3').igTree('nodesByValue', 0);
	assert.ok(node.length === 1, 'nodesByValue did not return a node');
	assert.equal(node.attr('data-path'), '0', 'nodesByValue returned a wrong node');
	node = $('#tree3').igTree('nodesByValue', 1);
	assert.equal(node.length, 2, 'nodesByValue did not return a node');
	assert.equal(node.first().attr('data-path'), '0_0', 'nodesByValue returned a wrong node');
	assert.equal(node.last().attr('data-path'), '4_0', 'nodesByValue returned a wrong node');
	// findNodesByText method
	node = $('#tree3').igTree('findNodesByText', 'Unit testing');
	assert.equal(node.length, 36, 'Incorrect number of nodes retrieved by findNodesByText');
	assert.equal(node[0].path, '0', 'The root node was not returned');
	node = $('#tree3').igTree('findNodesByText', 'Unit testing1');
	assert.equal(node.length, 3, 'Incorrect number of nodes retrieved by findNodesByText');
	assert.equal(node[0].path, '0_0', 'The first node was not returned correctly');
	node = $('#tree3').igTree('findNodesByText', 'Unit testing2');
	assert.equal(node.length, 6, 'Incorrect number of nodes retrieved by findNodesByText');
	assert.equal(node[0].path, '0_0_0', 'The first node was not returned correctly');
	node = $('#tree3').igTree('findNodesByText', 'Unit testing1', $('#tree3').igTree('nodeByPath', '0'));
	assert.equal(node.length, 2, 'Incorrect number of nodes retrieved by findNodesByText');
	assert.equal(node[0].path, '0_0', 'The first node was not returned correctly');
	node = $('#tree3').igTree('findNodesByText', 'Unit testing2', $('#tree3').igTree('nodeByPath', '0'));
	assert.equal(node.length, 4, 'Incorrect number of nodes retrieved by findNodesByText');
	assert.equal(node[0].path, '0_0_0', 'The first node was not returned correctly');
	node = $('#tree3').igTree('findNodesByText', 'Unit Testing');
	assert.equal(node.length, 0, 'Incorrect number of nodes retrieved by findNodesByText');
	// findImmediateNodesByText method
	node = $('#tree3').igTree('findImmediateNodesByText', 'Unit testing1', $('#tree3').igTree('nodeByPath', '0'));
	assert.equal(node.length, 2, 'Incorrect number of nodes retrieved by findImmediateNodesByText');
	assert.equal(node[0].path, '0_0', 'The first node was not returned correctly');
	node = $('#tree3').igTree('findImmediateNodesByText', 'Unit testing3', $('#tree3').igTree('nodeByPath', '0'));
	assert.equal(node.length, 0, 'Incorrect number of nodes retrieved by findImmediateNodesByText');
	node = $('#tree3').igTree('findImmediateNodesByText', 'Unit testing');
	assert.equal(node.length, 5, 'Incorrect number of nodes retrieved by findImmediateNodesByText');
	for (var i = 0; i < node.length; i++) {
		assert.equal(node[i].path, i.toString(), 'Incorrect node was returned at position: ' + i)
	}
	node = $('#tree3').igTree('findImmediateNodesByText', 'Unit testing1', $('#tree3').igTree('nodeByPath', '0_0'));
	assert.equal(node.length, 0, 'Incorrect number of nodes retrieved by findImmediateNodesByText');
	node = $('#tree3').igTree('findImmediateNodesByText', 'Unit testing2', $('#tree3').igTree('nodeByPath', '0_0'));
	assert.equal(node.length, 2, 'Incorrect number of nodes retrieved by findImmediateNodesByText');
	// nodeByIndex method
	node = $('#tree3').igTree('nodeByIndex', 0, $('#tree3').igTree('nodeByPath', '0'));
	assert.equal(node.length, 1, 'Incorrect number of nodes retrieved by nodeByIndex');
	assert.equal(node.attr('data-path'), '0_0', 'Node by index did not return correct');
	node = $('#tree3').igTree('nodeByIndex', 3, $('#tree3').igTree('nodeByPath', '0'));
	assert.equal(node.length, 0, 'Incorrect number of nodes retrieved by findImmediateNodesByText');
	node = $('#tree3').igTree('nodeByIndex', 1);
	assert.equal(node.length, 1, 'Incorrect number of nodes retrieved by nodeByIndex');
	assert.equal(node.attr('data-path'), '1', 'Node by index did not return correct');
	
	node = $('#tree2').igTree('nodeByIndex', 0, $('#tree2').igTree('nodeByPath', '0'));
	assert.equal(node.length, 1, 'Incorrect number of nodes retrieved by nodeByIndex');
	assert.equal(node.attr('data-path'), '0_0', 'Node by index did not return correct');
	node = $('#tree2').igTree('nodeByIndex', 5, $('#tree2').igTree('nodeByPath', '0'));
	assert.equal(node.length, 0, 'Incorrect number of nodes retrieved by findImmediateNodesByText');
	node = $('#tree2').igTree('nodeByIndex', 1);
	assert.equal(node.length, 1, 'Incorrect number of nodes retrieved by nodeByIndex');
	assert.equal(node.attr('data-path'), '1', 'Node by index did not return correct');
	// nodeFromElement method
	var element = $('#tree3').find('li[data-path=0]');
	node = $('#tree3').igTree('nodeFromElement', element);
	assert.ok(node.hasOwnProperty('path'), 'Path property is missing in the node object');
	assert.equal(node.path, '0', 'Path property does not match');
	assert.ok(node.hasOwnProperty('element'), 'Element property is missing in the node object');
	assert.equal(node.element.attr('data-path'), '0', 'Element property does not match the node element');
	assert.ok(node.hasOwnProperty('binding'), 'Element property is missing in the node object');
	assert.equal(node.binding, $('#tree3').igTree('option', 'bindings'), 'Element property does not match the node element');
	assert.ok(node.hasOwnProperty('data'), 'Element property is missing in the node object');
	assert.equal(node.data, $('#tree3').igTree('option', 'dataSource').root().data()[0], 'Element property does not match the node element');
	// children method
	node = $('#tree3').igTree('children', $('#tree3').igTree('nodeByPath', '0'));
	assert.equal(node.length, 2, 'Node children did not return correct');
	assert.equal(node[0].path, '0_0', 'First element of the returned nodes does not match');
	node = $('#tree3').igTree('children', $('#tree3').igTree('nodeByPath', '0_0'));
	assert.equal(node.length, 2, 'Node children did not return correct');
	assert.equal(node[0].path, '0_0_0', 'First element of the returned nodes does not match');
	// childrenByPath method
	node = $('#tree3').igTree('childrenByPath', '0');
	assert.equal(node.length, 2, 'Node children did not return correct');
	assert.equal(node[0].path, '0_0', 'First element of the returned nodes does not match');
	node = $('#tree3').igTree('childrenByPath', '0_0');
	assert.equal(node.length, 2, 'Node children did not return correct');
	assert.equal(node[0].path, '0_0_0', 'First element of the returned nodes does not match');
});
QUnit.test(testId_7, function (assert) {
	var tree = $('#tree5'),
		node = tree.find('li[data-role=node]:first'),
		anchor = node.children('a');
	assert.expect(5);
	anchor.click();
	assert.ok(tree.igTree('isSelected', node), "The node wasn't selected.");
	$.ig.TestUtil.checkClass(anchor, 'ui-state-focus');
	tree.igTree("applyChangesToNode", node, {Text: "New Text", Value: 123});
	anchor = node.children('a');
	assert.equal(anchor.html(), "<span>New Text: </span>123", "applyChangesToNode did not change the node");
	assert.ok(tree.igTree("isSelected", node), "The node is no longer selected");
	$.ig.TestUtil.checkClass(anchor, 'ui-state-focus');
});
QUnit.test(testId_8, function (assert) {
	var $remoteLOD = $('#remoteLOD').igTree({
			dataSourceUrl: '/api/items',
			dataSourceType: 'remoteUrl',
			loadOnDemand: true,
			responseDataKey: "Items",
			//nodePopulating: function (event, ui) {
			//	$remoteLOD.igTree('option', 'dataSourceUrl', '/api/items?id=' + ui.data.id);
			//	return true;
			//},
			bindings: {
				textKey: 'Name',
				valueKey: 'Id',
				childDataProperty: 'Children'
			}
		}), node,
		tree = $("<div id='mock' />").appendTo(document.body).igTree({
			dataSourceUrl: '/api/jsonpitems',
			dataSourceType: 'remoteUrl',
			loadOnDemand: true,
			dragAndDrop: true,
			checkboxMode: "triState",
			responseDataKey: "Items",
			//nodePopulating: function (event, ui) {
			//	$remoteLOD.igTree('option', 'dataSourceUrl', '/api/items?id=' + ui.data.id);
			//	return true;
			//},
			bindings: {
				textKey: 'Name',
				valueKey: 'Id',
				childDataProperty: 'Children'
			}
		});
	assert.expect(3);
	var done = assert.async();

	tree.one("igtreenodepopulated", function (evt, ui) {
		assert.ok(ui.data.Children.length > 0);
		done();
	});
	tree.one("igtreerendered", function () {
		tree.igTree("toggleCheckstate", tree.find("li[data-role=node]:first"));
		tree.igTree("expand", tree.find("li[data-role=node]:first"));
	});

	$remoteLOD.one("igtreerendered", function (evt, ui) {
		node = $remoteLOD.find('li[data-role=node]:first');
		assert.ok(node.text() === notWorkingResponse1.Items[0].Name, "Initial data not loaded correctly.");

		$remoteLOD.igTree('toggle', node);
	});
	$remoteLOD.one("igtreenodepopulated", function (evt, ui) {
		assert.ok(ui.data.Children.length === notWorkingResponse2.Items.length &&
			ui.data.Children[0].Name === notWorkingResponse2.Items[0].Name, "Child nodes were not populated successfully.");
	});
});

QUnit.test(testId_10, function (assert) {
	var $treeApos = $('#treeApos').igTree({
			dataSource: pivotData,
			checkboxMode: "triState",
			bindings: {
				textKey: "caption",
				valueKey: "uniqueName",
				childDataProperty: "children"
			}
		}), 
		nodeValue = pivotData[0].uniqueName.replace("'", "\\'"),
		nodeText = pivotData[0].caption.replace("'", "\\'");
	assert.expect(4);
	assert.ok($treeApos.igTree("nodesByValue", nodeValue).length === 1, "nodesByValue API does not work with value that contains apostrophes");
	assert.ok($treeApos.igTree("findNodesByText", nodeText).length === 1, "findNodesByText API does not work with value that contains apostrophes");
	$treeApos.igTree("removeNodesByValue", nodeValue);
	assert.ok($treeApos.igTree("nodesByValue", nodeValue).length === 0, "Node with value that contains apostrophes should be deleted");
	assert.ok(pivotData.length === 0, "pivotData data source should be empty");
});
/* ***************** END igTree databinding ***************** */

/* ***************** igTree Client events ***************** */

testId_1 = "igTree databinding events";
testId_2 = "igTree rendering events";
testId_3 = "igTree selection and click events";
testId_4 = "igTree expanding and collapsing events";
testId_5 = "igTree checkstateChanging/Changed events";
testId_6 = "igTree node populating/populated events";

QUnit.test(testId_1, function (assert) {
	assert.expect(6);
	var dataBoundFired = false;
	$('#tree8').igTree({
		dataBinding: function (event, args) {
			assert.ok(args.owner === $('#tree8').data('igTree'), 'Arguments are empty');
			assert.ok(!dataBoundFired, 'Databound fired before databinding');
			assert.ok($('#tree8').find('li[data-role=node]').length === 0, 'List items are rendered before databinding is fired.');
		},
		dataBound: function (event, args) {
			dataBoundFired = true;
			assert.ok(args.owner === $('#tree8').data('igTree'), 'Arguments are empty');
			assert.equal(args.dataView, $('#tree8').igTree('option', 'dataSource').root().data(), 'Dataview argument mismatch');
			assert.ok($('#tree8').find('li[data-role=node]').length === 0, 'List items are rendered before databound is fired.');
		}
	});
});
QUnit.test(testId_2, function (assert) {
	assert.expect(6);
	var dataRendered = false, dataRendering = false;
	$('#tree9').igTree({
		rendering: function (event, args) {
			dataRendering = true;
			assert.ok(args.owner === $('#tree9').data('igTree'), 'Arguments are empty');
			assert.equal(args.dataView, $('#tree9').igTree('option', 'dataSource').root().data(), 'Dataview argument mismatch');
			assert.ok(!dataRendered, 'Rendered fired before rendering');
			assert.ok($('#tree9').find('li[data-role=node]').length === 0, 'List items are rendered before rendering event is fired.');
		},
		rendered: function (event, args) {
			dataRendered = true;
			assert.ok(args.owner === $('#tree9').data('igTree'), 'Arguments are empty');
			assert.equal($('#tree9').find('li[data-role=node]').length, 76, 'Nodes were not rendered after rendered event was fired');
		}
	});
});
QUnit.test(testId_3, function (assert) {
	assert.expect(33);
	var changedFired = false, changingFired = false, clickFired = false;
	$('#tree9').igTree({
		nodeClick: function (event, args) {
			clickFired = true;
			assert.ok(!changedFired, 'Selection changed fired before selection changing');
			assert.ok(!changingFired, 'Selection changing fired before selection changing');
			assert.ok(args.owner === $('#tree9').data('igTree'), 'Owner argument does not match');
			assert.equal(args.node.path, '0', 'Click event argument mismatch');
			assert.equal(args.node.element.attr('data-path'), '0', 'Click event argument mismatch');
			assert.equal(args.node.data, $('#tree9').igTree('option', 'dataSource').root().data()[0], 'selectedNodes data event argument is not null');
			assert.equal(args.node.binding, $('#tree9').igTree('option', 'bindings'), 'selectedNodes binding event argument is not null');
		},
		nodeDoubleClick: function (event, args) {
			assert.equal(args.path, '0', 'Click event argument mismatch');
			assert.equal(args.element.attr('data-path'), '0', 'Click event argument mismatch');
			assert.equal(args.data, $('#tree9').igTree('option', 'dataSource').root().data()[0], 'selectedNodes data event argument is not null');
			assert.equal(args.binding, $('#tree9').igTree('option', 'bindings'), 'selectedNodes binding event argument is not null');
		},
		selectionChanging: function (event, args) {
			changingFired = true;
			assert.ok(!changedFired, 'Selection changed fired before selection changing');
			assert.ok(clickFired, 'Node click has not fired');
			assert.ok(args.owner === $('#tree9').data('igTree'), 'Owner argument does not match');
			assert.equal(args.selectedNodes[0].path, null, 'selectedNodes path event argument is not null');
			assert.equal(args.selectedNodes[0].element, null, 'selectedNodes element event argument is not null');
			assert.equal(args.selectedNodes[0].data, null, 'selectedNodes data event argument is not null');
			assert.equal(args.selectedNodes[0].binding, null, 'selectedNodes binding event argument is not null');
			assert.equal(args.newNodes[0].path, '0', 'selectedNodes path event argument is not null');
			assert.equal(args.newNodes[0].element.attr('data-path'), '0', 'selectedNodes element event argument is not null');
			assert.equal(args.newNodes[0].data, $('#tree9').igTree('option', 'dataSource').root().data()[0], 'selectedNodes data event argument is not null');
			assert.equal(args.newNodes[0].binding, $('#tree9').igTree('option', 'bindings'), 'selectedNodes binding event argument is not null');
		},
		selectionChanged: function (event, args) {
			changedFired = true;
			assert.ok(clickFired, 'Node click has not fired');
			assert.ok(changingFired, 'Selection changing has node fired');
			assert.ok(args.owner === $('#tree9').data('igTree'), 'Owner argument does not match');
			assert.equal(args.selectedNodes[0].path, '0', 'selectedNodes path event argument is not null');
			assert.equal(args.selectedNodes[0].element.attr('data-path'), '0', 'selectedNodes element event argument is not null');
			assert.equal(args.selectedNodes[0].data, $('#tree9').igTree('option', 'dataSource').root().data()[0], 'selectedNodes data event argument is not null');
			assert.equal(args.selectedNodes[0].binding, $('#tree9').igTree('option', 'bindings'), 'selectedNodes binding event argument is not null');
			assert.equal(args.newNodes[0].path, '0', 'selectedNodes path event argument is not null');
			assert.equal(args.newNodes[0].element.attr('data-path'), '0', 'selectedNodes element event argument is not null');
			assert.equal(args.newNodes[0].data, $('#tree9').igTree('option', 'dataSource').root().data()[0], 'selectedNodes data event argument is not null');
			assert.equal(args.newNodes[0].binding, $('#tree9').igTree('option', 'bindings'), 'selectedNodes binding event argument is not null');
		}
	});
	$('#tree9').find('li[data-path=0] > a').click();
	$('#tree9').find('li[data-path=0] > a').dblclick();
});
QUnit.test(testId_4, function (assert) {
	assert.expect(39);
	var done = assert.async();
	var expandingFired = false, expandedFired = false, collapsingFired = false, collapsedFired = false;
	$('#tree9').igTree({
		singleBranchExpand: true,
		animationDuration: 0,
		nodeExpanding: function (event, args) {
			if (!expandingFired) {
				expandingFired = true;
				assert.ok(!collapsingFired, 'Node collapsing event has fired prematurely on single branch expand');
				assert.ok(!collapsedFired, 'Node collapsed event has fired prematurely on single branch expand');
				assert.ok(!expandedFired, 'Node expanded event fired before node expanding event');
				assert.ok(args.owner === $('#tree9').data('igTree'), 'Owner argument does not match');
				assert.equal(args.node.path, '1', 'Expanding node path event argument is not null');
				assert.equal(args.node.element.attr('data-path'), '1', 'Expanding node element event argument is not null');
				assert.equal(args.node.data, $('#tree9').igTree('option', 'dataSource').root().data()[1], 'Expanding node data event argument is not null');
				assert.equal(args.node.binding, $('#tree9').igTree('option', 'bindings'), 'Expanding node binding event argument is not null');
			} else {
				assert.ok(args.owner === $('#tree9').data('igTree'), 'Owner argument does not match');
				assert.equal(args.node.path, '2', 'Expanding node path event argument is not null');
				assert.equal(args.node.element.attr('data-path'), '2', 'Expanding node element event argument is not null');
				assert.equal(args.node.data, $('#tree9').igTree('option', 'dataSource').root().data()[2], 'Expanding node data event argument is not null');
				assert.equal(args.node.binding, $('#tree9').igTree('option', 'bindings'), 'Expanding node binding event argument is not null');
			}
		},
		nodeExpanded: function (event, args) {
			if (!expandedFired) {
				expandedFired = true;
				assert.ok(!collapsingFired, 'Node collapsing event has not fired');
				assert.ok(!collapsedFired, 'Node collapsed event has not fired');
				assert.ok(expandingFired, 'Node expanding event has not fired yet');
				assert.ok(args.owner === $('#tree9').data('igTree'), 'Owner argument does not match');
				assert.equal(args.node.path, '1', 'Expanding node path event argument is not null');
				assert.equal(args.node.element.attr('data-path'), '1', 'Expanding node element event argument is not null');
				assert.equal(args.node.data, $('#tree9').igTree('option', 'dataSource').root().data()[1], 'Expanding node data event argument is not null');
				assert.equal(args.node.binding, $('#tree9').igTree('option', 'bindings'), 'Expanding node binding event argument is not null');
			} else {
				assert.ok(args.owner === $('#tree9').data('igTree'), 'Owner argument does not match');
				assert.equal(args.node.path, '2', 'Expanding node path event argument is not null');
				assert.equal(args.node.element.attr('data-path'), '2', 'Expanding node element event argument is not null');
				assert.equal(args.node.data, $('#tree9').igTree('option', 'dataSource').root().data()[2], 'Expanding node data event argument is not null');
				assert.equal(args.node.binding, $('#tree9').igTree('option', 'bindings'), 'Expanding node binding event argument is not null');
				done();
			}
		},
		nodeCollapsing: function (event, args) {
			collapsingFired = true;
			assert.ok(!collapsedFired, 'Node collapsed event fired before node collapsing event');
			collapsedFired = false;
			assert.ok(args.owner === $('#tree9').data('igTree'), 'Owner argument does not match');
			assert.equal(args.node.path, '1', 'Expanding node path event argument is not null');
			assert.equal(args.node.element.attr('data-path'), '1', 'Expanding node element event argument is not null');
			assert.equal(args.node.data, $('#tree9').igTree('option', 'dataSource').root().data()[1], 'Expanding node data event argument is not null');
			assert.equal(args.node.binding, $('#tree9').igTree('option', 'bindings'), 'Expanding node binding event argument is not null');
		},
		nodeCollapsed: function (event, args) {
			collapsedFired = true;
			assert.ok(collapsingFired, 'Node collapsing event has not fired yet');
			collapsingFired = false;
			assert.ok(args.owner === $('#tree9').data('igTree'), 'Owner argument does not match');
			assert.equal(args.node.path, '1', 'Expanding node path event argument is not null');
			assert.equal(args.node.element.attr('data-path'), '1', 'Expanding node element event argument is not null');
			assert.equal(args.node.data, $('#tree9').igTree('option', 'dataSource').root().data()[1], 'Expanding node data event argument is not null');
			assert.equal(args.node.binding, $('#tree9').igTree('option', 'bindings'), 'Expanding node binding event argument is not null');
		}
	});

	assert.equal($('#tree9').igTree('option', 'animationDuration'), 0, 'Animation duration did not setup properly');
	var node = $('#tree9').igTree('nodeByPath', '1');
	node.children(".ui-igtree-expander:first").click();
	node = $('#tree9').igTree('nodeByPath', '2');
	node.children(".ui-igtree-expander:first").click();
	// check that no errors are thrown on checkbox API with checkboxMode="off" which is default
	try {
		$('#tree9').igTree('toggleCheckstate', node);
		var nodeObj = $('#tree9').igTree('nodeFromElement', node);
		$('#tree9').igTree('checkNode', nodeObj);
		$('#tree9').igTree('uncheckNode', nodeObj);
		$('#tree9').igTree('partiallyCheckNode', nodeObj);
	} catch (e) {
		assert.ok(false, e.message);
	}
});
QUnit.test(testId_5, function (assert) {
	var changingFired = false, changedFired = false;
	assert.expect(34);
	$('#tree6').igTree({
		checkboxMode: 'triState',
		nodeCheckstateChanging: function (event, args) {
			if (!changingFired) {
				changingFired = true;
				assert.ok(!changedFired, 'Node checkstate changed fired before node checkstate changing');
				assert.ok(args.owner === $('#tree6').data('igTree'), 'Owner argument does not match');
				assert.equal(args.node.path, '0', 'Node getting checked`s path event argument is not null');
				assert.equal(args.node.element.attr('data-path'), '0', 'Node getting checked`s element event argument is not null');
				assert.equal(args.node.data, $('#tree6').igTree('option', 'dataSource').root().data()[0], 'Node getting checked`s data event argument is not null');
				assert.equal(args.node.binding, $('#tree6').igTree('option', 'bindings'), 'Node getting checked`s binding event argument is not null');
				assert.equal(args.currentState, 'off', 'The current checkstate of the node in the arguments doesnt match');
				assert.equal(args.newState, 'on', 'The new checkstate of the node in the arguments doesnt match');
				assert.equal(args.currentCheckedNodes.length, 0, 'The currentCheckedNodes object is not properly populated');
			} else {
				// second toggle
				assert.ok(args.owner === $('#tree6').data('igTree'), 'Owner argument does not match');
				assert.equal(args.node.path, '0_0', 'Node getting checked`s path event argument is not null');
				assert.equal(args.node.element.attr('data-path'), '0_0', 'Node getting checked`s element event argument is not null');
				assert.equal(args.node.data, $('#tree6').igTree('option', 'dataSource').root().data()[0].Nodes[0], 'Node getting checked`s data event argument is not null');
				assert.equal(args.node.binding, $('#tree6').igTree('option', 'bindings'), 'Node getting checked`s binding event argument is not null');
				assert.equal(args.currentState, 'on', 'The current checkstate of the node in the arguments doesnt match');
				assert.equal(args.newState, 'off', 'The new checkstate of the node in the arguments doesnt match');
				assert.equal(args.currentCheckedNodes.length, 6, 'The currentCheckedNodes object is not properly populated');
			}
		},
		nodeCheckstateChanged: function (event, args) {
			if (!changedFired) {
				changedFired = true;
				assert.ok(changingFired, 'Node checkstate changed fired before node checkstate changing');
				assert.ok(args.owner === $('#tree6').data('igTree'), 'Owner argument does not match');
				assert.equal(args.node.path, '0', 'Node getting checked`s path event argument is not null');
				assert.equal(args.node.element.attr('data-path'), '0', 'Node getting checked`s element event argument is not null');
				assert.equal(args.node.data, $('#tree6').igTree('option', 'dataSource').root().data()[0], 'Node getting checked`s data event argument is not null');
				assert.equal(args.node.binding, $('#tree6').igTree('option', 'bindings'), 'Node getting checked`s binding event argument is not null');
				assert.equal(args.newState, 'on', 'The new checkstate of the node in the arguments doesnt match');
				assert.equal(args.newCheckedNodes.length, 6, 'The new checked nodes arguments doesnt match');
				assert.equal(args.newPartiallyCheckedNodes.length, 0, 'The currentCheckedNodes object is not properly populated');
			} else {
				// second toggle
				assert.ok(args.owner === $('#tree6').data('igTree'), 'Owner argument does not match');
				assert.equal(args.node.path, '0_0', 'Node getting checked`s path event argument is not null');
				assert.equal(args.node.element.attr('data-path'), '0_0', 'Node getting checked`s element event argument is not null');
				assert.equal(args.node.data, $('#tree6').igTree('option', 'dataSource').root().data()[0].Nodes[0], 'Node getting checked`s data event argument is not null');
				assert.equal(args.node.binding, $('#tree6').igTree('option', 'bindings'), 'Node getting checked`s binding event argument is not null');
				assert.equal(args.newState, 'off', 'The new checkstate of the node in the arguments doesnt match');
				assert.equal(args.newCheckedNodes.length, 2, 'The new checked nodes arguments doesnt match');
				assert.equal(args.newPartiallyCheckedNodes.length, 1, 'The currentCheckedNodes object is not properly populated');
			}
		}
	});
	var node = $('#tree6').igTree('nodeByPath', '0');
	$('#tree6').igTree('toggleCheckstate', node, true);
	var node = $('#tree6').igTree('nodeByPath', '0_0');
	$('#tree6').igTree('toggleCheckstate', node, true);
});
QUnit.test(testId_6, function (assert) {
	var populatingFired = false, populatedFired = false, renderingFired = false, renderedFired = false;
	assert.expect(22);
	$('#tree7').igTree({
		loadOnDemand: true,
		nodePopulating: function (event, args) {
			populatingFired = true;
			assert.ok(!populatedFired, "Node populated fired before node populating");
			assert.equal(args.path, '0', 'Node getting checked`s path event argument is not null');
			assert.equal(args.element.attr('data-path'), '0', 'Node getting checked`s element event argument is not null');
			assert.equal(args.data, $('#tree7').igTree('option', 'dataSource').root().data()[0], 'Node getting checked`s data event argument is not null');
			assert.equal(args.binding, $('#tree7').igTree('option', 'bindings'), 'Node getting checked`s binding event argument is not null');
		},
		nodePopulated: function (event, args) {
			populatedFired = true;
			assert.ok(populatingFired, "Node populated fired before node populating");
			assert.equal(args.path, '0', 'Node getting checked`s path event argument is not null');
			assert.equal(args.element.attr('data-path'), '0', 'Node getting checked`s element event argument is not null');
			assert.equal(args.data, $('#tree7').igTree('option', 'dataSource').root().data()[0], 'Node getting checked`s data event argument is not null');
			assert.equal(args.binding, $('#tree7').igTree('option', 'bindings'), 'Node getting checked`s binding event argument is not null');
		},
		rendering: function (event, args) {
			if (!renderingFired) {
				renderingFired = true;
				assert.ok(!renderedFired, "Node rendered fired before node rendering");
				assert.ok(!populatingFired, "Node populating fired before initial render");
				assert.ok(!populatedFired, "Node populated fired before initial render");
				assert.equal(args.dataView, $('#tree7').igTree('option', 'dataSource').root().data(), 'Dataview argument mismatch');
			} else {
				assert.ok(populatingFired, "Rendering fired before the nodes get populated");
				assert.ok(populatedFired, "Rendering fired before the nodes get populated");
				assert.equal(args.dataView, $('#tree7').igTree('option', 'dataSource').root().data()[0].Nodes, 'Dataview argument mismatch');
			}
		},
		rendered: function (event, args) {
			if (!renderedFired) {
				renderedFired = true;
				assert.ok(renderingFired, "Node rendered fired before node rendering");
				assert.ok(!populatingFired, "Node populating fired before initial render");
				assert.ok(!populatedFired, "Node populated fired before initial render");
			} else {
				assert.ok(populatingFired, "Rendering fired before the nodes get populated");
				assert.ok(populatedFired, "Rendering fired before the nodes get populated");
			}
		}
	});
	var node = $('#tree7').igTree('nodeByPath', '0');
	$('#tree7').igTree('toggle', node);
});

/* ***************** END igTree Client events ***************** */

/* ***************** igTree add/remove nodes ***************** */

testId_1 = "igTree add node without specifying a parent.";
testId_2 = "igTree add node on a parent.";
testId_3 = "igTree remove node";
testId_4 = "igTree full path recalculation upon remove";
testId_5 = "igTree insert at index";
testId_6 = "igTree add/remove using diverse hierarchical bindings";
testId_7 = "igTree init drag and drop";
testId_8 = "igTree simulate drag events";
testId_9 = "igTree setOption methods";
testId_10 = "igTree transaction log";
testId_11 = "igTree add/remove with render on demand";
testId_12 = "igTree remove nodes by value";

QUnit.test(testId_1, function (assert) {
	assert.expect(13);
	$('#tree1').igTree({
		checkboxMode: 'triState',
		parentNodeImageUrl: 'images/folder.gif',
		parentNodeImageTooltip: 'folder',
		leafNodeImageUrl: 'images/folder_images.gif',
		leafNodeImageTooltip: 'folder_image'
	});
	var nodeCount = $('#tree1').find('li[data-role=node]').length, 
		data = $('#tree1').igTree('option', 'dataSource').root().data(),
		nodeImg,
		checkbox,
		node;
	assert.equal(nodeCount, 0, 'The tree has been populated initially');
	assert.equal(data.length, 0, 'The data source for the tree contains data when it should be empty');
	$('#tree1').igTree('addNode', { Text: 'New Node', Value: 1 });
	nodeCount = $('#tree1').find('li[data-role=node]').length;
	data = $('#tree1').igTree('option', 'dataSource').root().data();
	assert.equal(nodeCount, 1, 'The first node was not correctly added to the DOM.');
	assert.equal(data.length, 1, 'The data source did not update correctly after adding the first node.');
	assert.ok(data[0].hasOwnProperty('Text'), 'The data source does not contain a text property for the first added node');
	assert.equal(data[0].Text, 'New Node', 'The text property in the data source did not contain the correct text.');
	node = $('#tree1').igTree('nodeByPath', '0');
	$.ig.TestUtil.checkClass(node, 'ui-igtree-node-nochildren');
	assert.equal(node.children('span[data-role=checkbox]').length, 1, 'The checkbox did not render after adding a node.');
	assert.equal(node.children('img[data-role=leaf-node-image]').length, 1, 'The leaf node image did not render after adding a node.');
	assert.equal(node.children('img[data-role=leaf-node-image]').attr('src'), 'images/folder_images.gif', 'The leaf node image has incorrect src after adding a node.');
	assert.equal(node.children('img[data-role=leaf-node-image]').attr('title'), 'folder_image', 'The leaf node image has incorrect src after adding a node.');
	$('#tree1').igTree('addNode', [{ Text: 'New Node' }, { Text: 'New Node' }, { Text: 'New Node', Value: 1 }]);
	nodeCount = $('#tree1').find('li[data-role=node]').length;
	data = $('#tree1').igTree('option', 'dataSource').root().data();
	assert.equal(nodeCount, 4, 'The first node was not correctly added to the DOM.');
	assert.equal(data.length, 4, 'The data source did not update correctly after adding the first node.');
});

QUnit.test(testId_2, function (assert) {
	var path = '0',
		node = $('#tree1').igTree('nodeByPath', path),
		childCount = node.find('li[data-role=node]').length,
		data;
	assert.expect(19);
	assert.equal(childCount, 0, 'The node has children initially');
	$('#tree1').igTree('addNode', { Text: 'New Node' }, node);
	childCount = node.find('li[data-role=node]').length;
	data = $('#tree1').igTree('nodeDataFor', path);
	assert.ok(data.hasOwnProperty('Nodes'), 'Child data has not been properly populated.');
	data = data.Nodes;
	assert.equal(childCount, 1, 'The first node was not correctly added to the DOM.');
	assert.equal(data.length, 1, 'The data source did not update correctly after adding the first node.');
	assert.ok(data[0].hasOwnProperty('Text'), 'The data source does not contain a text property for the first added node');
	assert.equal(data[0].Text, 'New Node', 'The text property in the data source did not contain the correct text.');
	$.ig.TestUtil.checkClass(node, 'ui-igtree-noderoot');
	assert.equal(node.children('span[data-role=checkbox]').length, 1, 'The checkbox did not render after adding a node.');
	assert.equal(node.children('img[data-role=leaf-node-image]').length, 0, 'The leaf node image did not render after adding a node.');
	assert.equal(node.children('img[data-role=parent-node-image]').length, 1, 'The leaf node image did not render after adding a node.');
	assert.equal(node.children('img[data-role=parent-node-image]').attr('src'), 'images/folder.gif', 'The leaf node image has incorrect src after adding a node.');
	assert.equal(node.children('img[data-role=parent-node-image]').attr('title'), 'folder', 'The leaf node image has incorrect src after adding a node.');
	$('#tree1').igTree('addNode', [{ Text: 'New Node' }, { Text: 'New Node' }, { Text: 'New Node', Value: 1 }], node);
	childCount = node.find('li[data-role=node]').length;
	data = $('#tree1').igTree('nodeDataFor', path);
	data = data.Nodes;
	assert.equal(childCount, 4, 'The first node was not correctly added to the DOM.');
	assert.equal(data.length, 4, 'The data source did not update correctly after adding the first node.');
	path = '0_0';
	node = $('#tree1').igTree('nodeByPath', path);
	assert.equal(node.children('span[data-role=checkbox]').length, 1, 'The checkbox did not render after adding a node.');
	assert.equal(node.children('img[data-role=leaf-node-image]').length, 1, 'The leaf node image did not render after adding a node.');
	assert.equal(node.children('img[data-role=leaf-node-image]').attr('src'), 'images/folder_images.gif', 'The leaf node image has incorrect src after adding a node.');
	assert.equal(node.children('img[data-role=leaf-node-image]').attr('title'), 'folder_image', 'The leaf node image has incorrect src after adding a node.');
	$('#tree1').igTree('toggleCheckstate', node);
	$('#tree1').igTree('addNode', { Text: 'New Node' }, node);
	path = '0_0_0';
	node = $('#tree1').igTree('nodeByPath', path);
	assert.ok($('#tree1').igTree('isChecked', node), 'The checkbox of the new node did not render as checked');
});

QUnit.test(testId_3, function (assert) {
	assert.expect(12);
	var path = '0_0',
		node = $('#tree1').igTree('nodeByPath', path),
		nodeCount = $('#tree1').find('li[data-role=node]').length,
		data = $('#tree1').igTree('option', 'dataSource').root().data();
		
	assert.equal(nodeCount, 9, 'Node count did not initially match.');
	assert.equal(data.length, 4, 'There are less than 4 data members at root level.');
	assert.equal(data[0].Nodes.length, 4, 'There are less than 4 data members at first node child level.');
	$('#tree1').igTree('removeAt', path);
	nodeCount = $('#tree1').find('li[data-role=node]').length;
	data = $('#tree1').igTree('option', 'dataSource').root().data();
	assert.equal(nodeCount, 7, 'Node count did not initially match.');
	assert.equal(data.length, 4, 'There are less than 4 data members at root level.');
	assert.equal(data[0].Nodes.length, 3, 'There are less than 4 data members at first node child level.');
	assert.ok(!data[0].Nodes[0].hasOwnProperty('Nodes'), 'The node data was not properly removed');
	path = '0';
	node = $('#tree1').igTree('nodeByPath', path);
	assert.equal($('#tree1').igTree('checkState', node), 'off', 'Parent node checkstate did not update after removing a child.');
	var children = $('#tree1').igTree('children', node);
	assert.equal(children.length, 3, 'The first root node does not have three children.');
	for (var i = 0; i < children.length; i++) {
		assert.equal(children[i].element.attr('data-path'), 0 + '_' + i, 'The path was not correctly recalculated.');
	}
});

QUnit.test(testId_4, function (assert) {
	assert.expect(8);
	$('#tree4').igTree('removeAt', '0');
	var node = $('#tree4').igTree('nodeByPath', '4');
	assert.equal(node.length, 0, 'A node with path 4 still exists');
	node = $('#tree4').igTree('nodeByPath', '1');
	assert.equal(node.length, 1, 'A node with path 4 still exists');
	var children = $('#tree4').igTree('children', node), subchildren;
	for (var i = 0; i < children.length; i++) {
		assert.equal(children[i].element.attr('data-path'), 1 + '_' + i, 'Child path for children of 2nd root node were incorrecly recalculated');
		subchildren = $('#tree4').igTree('children', children[i].element);
		for (var j = 0; j < subchildren.length; j++) {
			assert.equal(subchildren[j].element.attr('data-path'), 1 + '_' + i + '_' + j, 'Child path for children of the children of 2nd root node were incorrecly recalculated');
		}
	}
});

QUnit.test(testId_5, function (assert) {
	assert.expect(21);

	// Insert at root first
	$('#tree1').igTree('addNode', { Text: 'Node 1', Value: '0x0000' }, 1);
	var node = $('#tree1').igTree('nodeByPath', 1), nodeCount = $('#tree1').find('li[data-role=node]').length;
	assert.equal(nodeCount, 8, 'The added node at index 1 of the root is not correctly rendered.');
	assert.equal(node.attr('data-value'), '0x0000', 'The value of the node was not rendered correctly.');
	assert.equal($('#tree1').igTree('nodesByValue', '0x0000').length, 1, 'The added node with value 0x0000 was not correctly retrieved.');
	var data = $('#tree1').igTree('nodeDataFor', '1');
	assert.ok(data.hasOwnProperty('Text'), 'The data member did not contain its text property.');
	assert.equal(data.Text, 'Node 1', 'The value of the text property of the data member did not match.');
	assert.ok(data.hasOwnProperty('Value'), 'The data member did not contain its value property.');
	assert.equal(data.Value, '0x0000', 'The value of the node did not match.');
	// Insert at index
	node = $('#tree1').igTree('nodeByPath', '0');
	$('#tree1').igTree('addNode', { Text: 'Node 2', Value: '0x0001' }, node, 1);
	node = $('#tree1').igTree('nodeByPath', '0_1');
	nodeCount = $('#tree1').find('li[data-role=node]').length;
	assert.equal(nodeCount, 9, 'The added node at index 1 of the root node 0 is not correctly rendered.');
	assert.equal(node.attr('data-value'), '0x0001', 'The value of the node was not rendered correctly.');
	assert.equal($('#tree1').igTree('nodesByValue', '0x0001').length, 1, 'The added node with value 0x0000 was not correctly retrieved.');
	data = $('#tree1').igTree('nodeDataFor', '0_1');
	assert.ok(data.hasOwnProperty('Text'), 'The data member did not contain its text property.');
	assert.equal(data.Text, 'Node 2', 'The value of the text property of the data member did not match.');
	assert.ok(data.hasOwnProperty('Value'), 'The data member did not contain its value property.');
	assert.equal(data.Value, '0x0001', 'The value of the node did not match.');
	// Insert at index 0
	node = $('#tree1').igTree('nodeByPath', '0');
	$('#tree1').igTree('addNode', { Text: 'Node 3', Value: '0x0002' }, node, 0);
	node = $('#tree1').igTree('nodeByPath', '0_0');
	nodeCount = $('#tree1').find('li[data-role=node]').length;
	assert.equal(nodeCount, 10, 'The added node at index 0 of the root node 0 is not correctly rendered.');
	assert.equal(node.attr('data-value'), '0x0002', 'The value of the node was not rendered correctly.');
	assert.equal($('#tree1').igTree('nodesByValue', '0x0002').length, 1, 'The added node with value 0x0000 was not correctly retrieved.');
	data = $('#tree1').igTree('nodeDataFor', '0_0');
	assert.ok(data.hasOwnProperty('Text'), 'The data member did not contain its text property.');
	assert.equal(data.Text, 'Node 3', 'The value of the text property of the data member did not match.');
	assert.ok(data.hasOwnProperty('Value'), 'The data member did not contain its value property.');
	assert.equal(data.Value, '0x0002', 'The value of the node did not match.');
});

QUnit.test(testId_12, function (assert) {
	var path = '0_0',
		node = $('#tree1').igTree('nodeByPath', path),
		nodeCount = $('#tree1').find('li[data-role=node]').length,
		data = $('#tree1').igTree('option', 'dataSource').root().data();
	assert.expect(4);
	assert.equal(nodeCount, 10, 'Node count did not match initially.');
	assert.equal(data.length, 5, 'There are less than 5 data members at root level intially.');
	$('#tree1').igTree('removeNodesByValue', 1);
	node = $('#tree1').igTree('nodeByPath', path);
	nodeCount = $('#tree1').find('li[data-role=node]').length;
	data = $('#tree1').igTree('option', 'dataSource').root().data();
	assert.equal(nodeCount, 3, 'Node count did not match after remove.');
	assert.equal(data.length, 3, 'There are less than 3 data members at root level.');
});

QUnit.test("removeAt until all children are gone", function (assert) {
	assert.expect(1);
	var path = '0_0',
		node = $('#tree4').igTree('nodeByPath', "0"),
		children = $('#tree4').igTree('children', node);

	$('#tree4').igTree('removeAt', path);
	$('#tree4').igTree('removeAt', path);
	children = $('#tree4').igTree('children', node);
	assert.equal(children.length, 0, 'The first root node does not have 0 children.');
})

QUnit.test(testId_6, function (assert) {
	var node = $('#tree3').igTree('nodeByPath', '0'), nodeCount = $('#tree3').find('li[data-role=node]').length, childCount = node.find('li[data-role=node]').length, binding = $('#tree3').igTree('option', 'bindings').bindings;
	assert.expect(8);
	assert.equal(nodeCount, 36, 'The innitial node count is not correct.');
	assert.equal(childCount, 7, 'The innitial child node count for root node 0 is not correct.');
	var obj = {};
	obj[binding.textKey] = 'New Node 1';
	obj[binding.valueKey] = '0x00000000';
	obj[binding.imageUrlKey] = 'images/coins.png';
	obj[binding.navigateUrlKey] = 'http://infragistics.com'; 
	$('#tree3').igTree('addNode', obj, node);
	childCount = node.find('li[data-role=node]').length;
	assert.equal(childCount, 8, 'The innitial child node count for root node 0 is not correct.');
	node = $('#tree3').igTree('nodeByPath', '0_2');
	assert.equal(node.children('a').attr('href'), "http://infragistics.com", 'The anchor did not render properly from the data object');
	assert.equal(node.children('img').attr('src'), "images/coins.png", 'The image did not render properly from the data object');
	assert.equal(node.attr('data-value'), '0x00000000', 'The node value did not render properly.');
	assert.equal(node.children('a').text(), 'New Node 1', 'The node value did not render properly.');
	node.children('a').click();
	assert.ok($('#tree3').igTree('isSelected', node));
});

QUnit.test(testId_7, function (assert) {
	assert.expect(4);

	// Newly added node draggable and droppable
	$('#tree1').igTree('destroy').igTree({
		checkboxMode: 'triState',
		parentNodeImageUrl: 'images/folder.gif',
		parentNodeImageTooltip: 'folder',
		leafNodeImageUrl: 'images/folder_images.gif',
		leafNodeImageTooltip: 'folder_image',
		dragAndDrop: true
	});
	assert.notEqual($('#tree1').data('droppable'), undefined, 'The droppable was not correctly initialized on the igTree')
	$('#tree1').igTree('addNode', { Text: 'New Node' });
	var node = $('#tree1').igTree('nodeByPath', '0');
	assert.notEqual(node.data('draggable'), undefined, 'The draggable was not initialized correctly on the added node.');
	// Initial load draggable/droppable
	$('#tree5').igTree('destroy').igTree({
		dataSource: results2,
		dragAndDrop: true,
		bindings: {
			textKey: 'Text',
			valueKey: 'Value',
			imageUrlKey: 'ImageUrl',
			navigateUrlKey: 'URL',
			childDataProperty: 'Children',
			nodeContentTemplate: '<span>${Text}: </span>${Value}',
			bindings: {
				textKey: 'Text1',
				valueKey: 'Value1',
				imageUrlKey: 'ImageUrl1',
				navigateUrlKey: 'URL1',
				childDataProperty: 'Children1',
				nodeContentTemplate: '<font color="red">${Text1}: </font>${Value1}',
				bindings: {
					textKey: 'Text2',
					valueKey: 'Value2',
					imageUrlKey: 'ImageUrl2',
					navigateUrlKey: 'URL2',
					childDataProperty: 'Children2',
					nodeContentTemplate: '<font color="red">${Text2}: </font><font color="blue">${Value2}</font>',
					bindings: {
						textKey: 'Text3',
						valueKey: 'Value3'
					}
				}
			}
		}
	});
	assert.notEqual($('#tree5').data('droppable'), undefined, 'The droppable was not correctly initialized on the igTree')
	node = $('#tree5').igTree('nodeByPath', '0');
	assert.notEqual(node.data('draggable'), undefined, 'The draggable was not initialized correctly on the added node.');
});

QUnit.test(testId_8, function (assert) {
	assert.expect(54);
	var bindings = {
			textKey: 'Text',
			valueKey: 'Value',
			imageUrlKey: 'ImageUrl',
			navigateUrlKey: 'URL',
			childDataProperty: 'Children',
			nodeContentTemplate: '<span>${Text}: </span>${Value}',
			bindings: {
				textKey: 'Text1',
				valueKey: 'Value1',
				imageUrlKey: 'ImageUrl1',
				navigateUrlKey: 'URL1',
				childDataProperty: 'Children1',
				nodeContentTemplate: '<font color="red">${Text1}: </font>${Value1}',
				bindings: {
					textKey: 'Text2',
					valueKey: 'Value2',
					imageUrlKey: 'ImageUrl2',
					navigateUrlKey: 'URL2',
					childDataProperty: 'Children2',
					nodeContentTemplate: '<font color="red">${Text2}: </font><font color="blue">${Value2}</font>',
					bindings: {
						textKey: 'Text3',
						valueKey: 'Value3'
					}
				}
			}
		},
		tree = $("<div></div>").appendTo(document.body).igTree({
			dataSource: results2,
			dragAndDrop: true,
			dragAndDropSettings: {
				revertDuration: 0
			},
			bindings: bindings,
			dragStart: function (event, ui) {
				if (ui.element.attr("data-path") === "2") {
					return;
				}
				assert.equal(ui.element[0], tree.find("li[data-role=node]:first")[0], "The element event argument for drag start was incorrect.");
			},
			drag: function (event, ui) {
				if (ui.element.attr("data-path") === "2") {
					return false;
				}
				assert.equal(ui.element[0], tree.find("li[data-role=node]:first")[0], "The element event argument for drag was incorrect.");
			},
			nodeDropping: function (event, ui) {
				assert.equal(ui.originalIndex, 0, "Original index was wrong.");
				assert.equal(ui.targetIndex, 0, "Target index was wrong.");
			},
			nodeDropped: function (event, ui) {
				assert.equal(ui.element[0], tree.find("ul:first > li[data-role=node]:eq(1)")[0], "The element event argument for drag was incorrect.");
			}
		}),
		treeobj = tree.data("igTree");
	var node = tree.find("li[data-role=node]:first");
	$.ig.TestUtil.simulateDragStart(node);
	assert.equal(treeobj._sourceNode.data.Value, results2[0].Value, "Data Value was not correctly populated.");
	assert.equal(treeobj._sourceNode.data.Text, results2[0].Text, "Data Text was not correctly populated.");
	assert.equal(treeobj._sourceNode.owner, treeobj, "Owner was not correctly populated.");
	assert.equal(treeobj._sourceNode.element[0], node[0], "Element was not correctly populated.");
	assert.notEqual(treeobj._originalHelper.html, null, "The original helper was not instantiated.");
	$.ig.TestUtil.simulateDrag(node, tree.find("ul:first > li[data-role=node]:eq(1)"));
	assert.equal(treeobj._validationObject.valid, true, "The validation object validity was incorrect.");
	assert.equal(treeobj._validationObject.target, null, "The validation object target was incorrect.");
	
	$.ig.TestUtil.simulateDrop(tree, tree.find("ul:first > li[data-role=node]:eq(1)"));
	
	node = tree.find("li[data-role=node]:first");
	$.ig.TestUtil.simulateDragStart(node);
	$.ig.TestUtil.simulateDrag(node, tree.find("ul:first > li[data-role=node]:eq(1) > a"));
	assert.equal(treeobj._validationObject.valid, false, "The validation object validity was incorrect.");
	assert.equal(treeobj._validationObject.target[0], tree.find("ul:first > li[data-role=node]:eq(1)")[0], "The validation object target was incorrect.");
	$.ig.TestUtil.simulateDragStop(node);
	assert.equal(treeobj._sourceNode.data, null, "Data was not correctly populated.");
	assert.equal(treeobj._sourceNode.owner, null, "Owner was not correctly populated.");
	assert.equal(treeobj._sourceNode.element, null, "Element was not correctly populated.");
	assert.equal(treeobj._helperDirty, false, "helper dirty was not correctly populated.");
	assert.equal(treeobj._validationObject.expandTimeout, null, "expandTimeout was not correctly populated.");
	assert.equal(treeobj._validationObject.target, null, "target was not correctly populated.");
	node = tree.find("li[data-path='2']");
	$.ig.TestUtil.simulateDragStart(node);
	$.ig.TestUtil.simulateDrag(node, tree.find("ul:first > li[data-role=node]:eq(1) > a"));
	assert.equal(treeobj._sourceNode.data, null, "Data was not correctly populated.");
	assert.equal(treeobj._sourceNode.owner, null, "Owner was not correctly populated.");
	assert.equal(treeobj._sourceNode.element, null, "Element was not correctly populated.");
	assert.equal(treeobj._helperDirty, false, "helper dirty was not correctly populated.");
	assert.equal(treeobj._validationObject.expandTimeout, null, "expandTimeout was not correctly populated.");
	assert.equal(treeobj._validationObject.target, null, "target was not correctly populated.");

	treeobj = tree.data("igTree");
	var x = tree.igTree("children", tree.find("li[data-path=0]")).length,
		y = tree.igTree("children", tree.find("li[data-path=1]")).length;
	node = tree.find("li[data-path=0]");
	$.ig.TestUtil.simulateDragStart(node);
	$.ig.TestUtil.simulateDrag(node, tree.find("li[data-path=1] > a"));
	assert.equal(treeobj._validationObject.valid, false, "The validation object validity was incorrect.");
	assert.equal(treeobj._validationObject.target[0], tree.find("li[data-path=1]")[0], "The validation object target was incorrect.");
	$.ig.TestUtil.simulateDrop(tree, tree.find("li[data-path=1] > a"));
	assert.equal(tree.igTree("children", tree.find("li[data-path=0]")).length, x, "Source node in tree didn't update correctly.");
	assert.equal(tree.igTree("children", tree.find("li[data-path=1]")).length, y, "Target node in tree didn't update correctly.");

	tree.igTree("destroy").remove();
	
	tree = $("<div></div>").appendTo(document.body).igTree({
		dataSource: results2,
		dragAndDrop: true,
		dragAndDropSettings: {
			revertDuration: 0,
			dragAndDropMode: "copy",
			allowDrop: true
		},
		bindings: bindings
	});
	treeobj = tree.data("igTree");
	var x = tree.igTree("children", tree.find("li[data-path=0]")).length,
		y = tree.igTree("children", tree.find("li[data-path=1]")).length;
	node = tree.find("li[data-path=0_0]");
	$.ig.TestUtil.simulateDragStart(node);
	$.ig.TestUtil.simulateDrag(node, tree.find("li[data-path=1] > a"));
	assert.equal(treeobj._validationObject.valid, true, "The validation object validity was incorrect.");
	assert.equal(treeobj._validationObject.target[0], tree.find("li[data-path=1]")[0], "The validation object target was incorrect.");
	$.ig.TestUtil.simulateDrop(tree, tree.find("li[data-path=1] > a"));
	assert.equal(tree.igTree("children", tree.find("li[data-path=0]")).length, x, "Source node in tree didn't update correctly.");
	assert.equal(tree.igTree("children", tree.find("li[data-path=1]")).length, y + 1, "Target node in tree didn't update correctly.");
	
	var tree2 = $("<div></div>").appendTo(document.body).igTree({
		dataSource: $.extend(true, [], results2),
		dragAndDrop: true,
		dragAndDropSettings: {
			revertDuration: 0,
			dragAndDropMode: "move",
			allowDrop: true,
			customDropValidation: "validateCustom"
		},
		bindings: bindings
	});
	
	function validateCustom (target) { 
		assert.equal(this, tree.find("li[data-path=0_0]")[0], "Context of the custom validation is wrong");
		assert.equal(target, tree2.find("li[data-path=1]")[0], "Target of the custom validation is wrong");
		return true;
	};
	
	node = tree.find("li[data-path=0_0]");
	y = tree2.igTree("children", tree2.find("li[data-path=1]")).length;
	$.ig.TestUtil.simulateDragStart(node);
	$.ig.TestUtil.simulateDrag(node, tree2.find("li[data-path=1] > a"));
	assert.equal(treeobj._validationObject.valid, true, "The validation object validity was incorrect.");
	assert.equal(treeobj._validationObject.target[0], tree2.find("li[data-path=1]")[0], "The validation object target was incorrect.");
	$.ig.TestUtil.simulateDrop(tree2, tree2.find("li[data-path=1] > a"));
	assert.equal(tree.igTree("children", tree.find("li[data-path=0]")).length, x, "Source node in tree didn't update correctly.");
	assert.equal(tree2.igTree("children", tree2.find("li[data-path=1]")).length, y + 1, "Target node in tree2 didn't update correctly.");
	
	treeobj = tree2.data("igTree");
	node = tree2.find("li[data-path=0_0]");
	x = tree2.igTree("children", tree2.find("li[data-path=0]")).length
	y = tree.igTree("children", tree.find("li[data-path=1]")).length;
	$.ig.TestUtil.simulateDragStart(node);
	$.ig.TestUtil.simulateDrag(node, tree.find("li[data-path=1] > a"));
	assert.equal(treeobj._validationObject.valid, true, "The validation object validity was incorrect.");
	assert.equal(treeobj._validationObject.target[0], tree.find("li[data-path=1]")[0], "The validation object target was incorrect.");
	$.ig.TestUtil.simulateDrop(tree, tree.find("li[data-path=1] > a"));
	assert.equal(tree2.igTree("children", tree2.find("li[data-path=0]")).length, x - 1, "Source node in tree2 didn't update correctly.");
	assert.equal(tree.igTree("children", tree.find("li[data-path=1]")).length, y + 1, "Target node in tree didn't update correctly.");
	
	var tree3 = $("<div></div>").appendTo(document.body).igTree({
		dragAndDrop: true,
		dragAndDropSettings: {
			revertDuration: 0,
			dragAndDropMode: "copy",
			allowDrop: true
		},
		bindings: bindings
	});
	
	node = tree.find("li[data-path=0]");
	y = tree.find("li[data-path=0]").find("li[data-role=node]").length;
	$.ig.TestUtil.simulateDragStart(node);
	$.ig.TestUtil.simulateDrag(node, tree3);
	assert.equal(treeobj._validationObject.valid, true, "The validation object validity was incorrect.");
	$.ig.TestUtil.simulateDrop(tree3, tree3);
	assert.equal(tree3.igTree("children", tree3.find("li[data-role=node]")).length, y, "Target node in tree3 didn't update correctly.");
	
	var tree4 = $("<div></div>").appendTo(document.body).igTree({
		dragAndDrop: true,
		dragAndDropSettings: {
			revertDuration: 0,
			dragAndDropMode: "move",
			allowDrop: true
		},
		bindings: bindings
	});
	
	node = tree.find("li[data-path=0]");
	y = tree.find("li[data-path=0]").find("li[data-role=node]").length;
	$.ig.TestUtil.simulateDragStart(node);
	$.ig.TestUtil.simulateDrag(node, tree4);
	assert.equal(treeobj._validationObject.valid, true, "The validation object validity was incorrect.");
	$.ig.TestUtil.simulateDrop(tree4, tree4);
	assert.equal(tree4.igTree("children", tree4.find("li[data-role=node]")).length, y, "Target node in tree4 didn't update correctly.");
	
	var tree5 = $("<div></div>").appendTo(document.body).igTree({
		dragAndDrop: true,
		dragAndDropSettings: {
			revertDuration: 0,
			allowDrop: true
		},
		bindings: bindings
	});
	
	node = tree.find("li[data-path=0]");
	settings = tree.igTree("option", "dragAndDropSettings");
	settings.dragAndDropMode = "move";
	y = tree.find("li[data-path=0]").find("li[data-role=node]").length;
	$.ig.TestUtil.simulateDragStart(node);
	$.ig.TestUtil.simulateDrag(node, tree5);
	assert.equal(treeobj._validationObject.valid, true, "The validation object validity was incorrect.");
	$.ig.TestUtil.simulateDrop(tree5, tree5);
	assert.equal(tree5.igTree("children", tree5.find("li[data-role=node]")).length, y, "Target node in tree5 didn't update correctly.");

	node = tree.find("li[data-path=0]");
	settings.dragAndDropMode = "";
	$.ig.TestUtil.simulateDragStart(node);
	$.ig.TestUtil.simulateDrag(node, tree5);
	assert.equal(treeobj._validationObject.valid, true, "The validation object validity was incorrect.");
	$.ig.TestUtil.simulateDrop(tree5, tree5);
	assert.equal(tree5.igTree("children", tree5.find("li[data-role=node]")).length, 9, "Target node in tree5 didn't update correctly.");
	
	tree.igTree("destroy").remove();
	tree2.igTree("destroy").remove();
	tree3.igTree("destroy").remove();
	tree4.igTree("destroy").remove();
	tree5.igTree("destroy").remove();
});

QUnit.test(testId_9, function (assert) {
	assert.expect(39);

	// _setOption unit tests
	assert.throws(function () {$('#tree5').igTree('option', 'pathSeparator', '.');}, function (err) { return err.message === 'Runtime changes are not allowed for the following option: pathSeparator'; }, 'An error was not correctly thrown when changing pathSeparator at runtime');
	assert.throws(function () {$('#tree5').igTree('option', 'loadOnDemand', true);}, function (err) { return err.message === 'Runtime changes are not allowed for the following option: loadOnDemand'; }, 'An error was not correctly thrown when changing loadOnDemand at runtime');
	assert.throws(function () {$('#tree5').igTree('option', 'initialExpandDepth', true);}, function (err) { return err.message === 'Runtime changes are not allowed for the following option: initialExpandDepth'; }, 'An error was not correctly thrown when changing initialExpandDepth at runtime');
	assert.throws(function () {$('#tree5').igTree('option', 'bindings', {});}, function (err) { return err.message === 'Runtime changes are not allowed for the following option: bindings'; }, 'An error was not correctly thrown when changing initialExpandDepth at runtime');
	assert.throws(function () {$('#tree5').igTree('option', 'defaultNodeTarget', "_blank");}, function (err) { return err.message === 'Runtime changes are not allowed for the following option: defaultNodeTarget'; }, 'An error was not correctly thrown when changing initialExpandDepth at runtime');
	$('#tree1').igTree('option', 'width', 123);
	assert.equal($('#tree1').css('width'), '123px', 'The width was not correctly set.');
	$('#tree1').igTree('option', 'height', 234);
	assert.equal($('#tree1')[0].style.height, '234px', 'The height was not correctly set.');
	$('#tree14').igTree('option', 'parentNodeImageUrl', 'images/folder_images.gif');
	assert.equal($('#tree14').find('li[data-path=0]').children('img[data-role=parent-node-image]').attr('src'), 'images/folder_images.gif', 'The parentNodeImageUrl was not correctly set.');
	$('#tree14').igTree('option', 'leafNodeImageUrl', 'images/folder.gif');
	assert.equal($('#tree14').find('li[data-path=0_1]').children('img[data-role=leaf-node-image]').attr('src'), 'images/folder.gif', 'The leafNodeImageUrl was not correctly set.');
	$('#tree14').igTree('option', 'parentNodeImageTooltip', 'HACKED!');
	assert.equal($('#tree14').find('li[data-path=0]').children('img[data-role=parent-node-image]').attr('title'), 'HACKED!', 'The parentNodeImageTooltip was not correctly set.');
	$('#tree14').igTree('option', 'leafNodeImageTooltip', '2xHACKED!');
	assert.equal($('#tree14').find('li[data-path=0_1]').children('img[data-role=leaf-node-image]').attr('title'), '2xHACKED!', 'The leafNodeImageTooltip was not correctly set.');
	$('#tree15').igTree('option', 'parentNodeImageClass', 'css-sprite ui-icon-carat-1-ne');
	$.ig.TestUtil.checkClass($('#tree15').find('li[data-path=0]').children('span[data-role=parent-node-image]'), 'css-sprite ui-icon-carat-1-ne');
	assert.ok(!$('#tree15').find('li[data-path=0]').children('span[data-role=parent-node-image]').hasClass('ui-icon-carat-1-n'), 'The old class was not removed');
	$('#tree15').igTree('option', 'parentNodeImageTooltip', 'HACKED!');
	assert.equal($('#tree15').find('li[data-path=0]').children('span[data-role=parent-node-image]').attr('title'), 'HACKED!', 'The parentNodeImageTooltip was not correctly set.');
	$('#tree15').igTree('option', 'leafNodeImageClass', 'css-sprite ui-icon-carat-1-n');
	$.ig.TestUtil.checkClass($('#tree15').find('li[data-path=0_1]').children('span[data-role=leaf-node-image]'), 'css-sprite ui-icon-carat-1-n');
	assert.ok(!$('#tree15').find('li[data-path=0_1]').children('span[data-role=leaf-node-image]').hasClass('ui-icon-carat-1-ne'), 'The old class was not removed');
	$('#tree15').igTree('option', 'leafNodeImageTooltip', '2xHACKED!');
	assert.equal($('#tree15').find('li[data-path=0_1]').children('span[data-role=leaf-node-image]').attr('title'), '2xHACKED!', 'The leafNodeImageTooltip was not correctly set.');
	$('#tree15').igTree('option', 'hotTracking', false);
	$('#tree15').find('li[data-path=0] > a').mouseover();
	assert.ok(!$('#tree15').find('li[data-path=0] > a').hasClass('ui-state-hover'), 'The hottracking was not correctly removed');
	$('#tree14').igTree('option', 'checkboxMode', 'off');
	assert.equal($('#tree14').find('span[data-role=checkbox]').length, 0, 'The checkboxes were not correctly removed.');
	$('#tree14').igTree('option', 'checkboxMode', 'biState');
	assert.equal($('#tree14').find('span[data-role=checkbox]').length, 6, 'The checkboxes were not correctly rendered again.');
	$('#tree14').igTree('option', 'dataSource', results);
	assert.equal($('#tree14').find('li[data-role=node]').length, 32, 'The tree was not correctly rerendered after changing the data source');
	$('#tree14').igTree('option', 'dragAndDrop', true);
	assert.notEqual($('#tree14').find('li[data-path=0]').data('draggable'), undefined, 'The draggable was not correctly initialized after setOption');
	assert.notEqual($('#tree14').data('droppable'), undefined, 'The droppable was not correctly initialized after setOption');
	$('#tree14').igTree('option', 'dragAndDrop', false);
	assert.equal($('#tree14').find('li[data-path=0]').data('draggable'), undefined, 'The draggable was not correctly destroyed after setOption');
	assert.equal($('#tree14').data('droppable'), undefined, 'The droppable was not correctly destroyed after setOption');
	$('#tree14').igTree('option', 'updateUrl', 'http://update');
	assert.equal($('#tree14').igTree('option', 'dataSource').root().settings.updateUrl, 'http://update', 'The update url was not correcly changed in the data source');
	$('#tree14').igTree('option', 'dragAndDrop', true);
	$('#tree14').igTree('destroy');
	assert.equal($('#tree14').data('droppable'), undefined, 'The droppable was not correctly destroyed after destroy');
	
	var tree = $("<div></div>").appendTo(document.body).igTree({
		width: 800,
		height: 600,
		hotTracking: false,
		dataSource: [{Text: "a", Value: 0}]
	});
	assert.equal(tree[0].style.width, "800px", "The igTree width was not initially set correctly");
	assert.equal(tree[0].style.height, "600px", "The igTree height was not initially set correctly");
	
	assert.throws(function () { tree.igTree('option', 'parentNodeImageUrl', ''); }, function (err) { return err.message === $.ig.Tree.locale.setOptionError + "parentNodeImageUrl" }, 'An error was not correctly thrown when changing parentNodeImageUrl at runtime');
	assert.throws(function () { tree.igTree('option', 'parentNodeImageTooltip', ''); }, function (err) { return err.message === $.ig.Tree.locale.setOptionError + "parentNodeImageTooltip" }, 'An error was not correctly thrown when changing parentNodeImageTooltip at runtime');
	assert.throws(function () { tree.igTree('option', 'parentNodeImageClass', ''); }, function (err) { return err.message === $.ig.Tree.locale.setOptionError + "parentNodeImageClass" }, 'An error was not correctly thrown when changing parentNodeImageClass at runtime');
	assert.throws(function () { tree.igTree('option', 'leafNodeImageUrl', ''); }, function (err) { return err.message === $.ig.Tree.locale.setOptionError + "leafNodeImageUrl" }, 'An error was not correctly thrown when changing leafNodeImageUrl at runtime');
	assert.throws(function () { tree.igTree('option', 'leafNodeImageTooltip', ''); }, function (err) { return err.message === $.ig.Tree.locale.setOptionError + "leafNodeImageTooltip" }, 'An error was not correctly thrown when changing leafNodeImageTooltip at runtime');
	assert.throws(function () { tree.igTree('option', 'leafNodeImageClass', ''); }, function (err) { return err.message === $.ig.Tree.locale.setOptionError + "leafNodeImageClass" }, 'An error was not correctly thrown when changing leafNodeImageClass at runtime');
	
	tree.igTree("option", "hotTracking", true);
	tree.find("li[data-path=0] > a").mouseover();
	$.ig.TestUtil.checkClass(tree.find("li[data-path=0] > a"), 'ui-state-hover');
	tree.find("li[data-path=0] > a").mouseout();
	assert.ok(!tree.find("li[data-path=0] > a").hasClass("ui-state-hover"), "Hover style was not removed");
	
	tree.igTree("destroy");
	assert.equal(tree[0].style.width, "", "The igTree width was not removed after destroy");
	assert.equal(tree[0].style.height, "", "The igTree height was not removed after destroy");
	tree.remove();
});

QUnit.test(testId_10, function (assert) {
	assert.expect(14);
	var log = $('#tree5').igTree('transactionLog');
	assert.equal(log.length, 0, 'The transaction log is not initially empty.');
	log = $('#tree5').igTree('option', 'dataSource').root().allTransactions();
	assert.equal(log.length, 0, 'The transaction log is not initially empty.');
	$('#tree5').igTree('addNode', { Text: 'Added node' });
	log = $('#tree5').igTree('transactionLog');
	assert.equal(log.length, 1, 'The transaction was not recorded in the transaction log.');
	assert.equal(log[0].type, 'addnode', 'The transaction type is incorrect.');
	assert.equal(log[0].tdata.data.Text, 'Added node', 'The transaction data is incorrect.');
	log = $('#tree5').igTree('option', 'dataSource').root().allTransactions();
	assert.equal(log.length, 1, 'The transaction was not recorded in the transaction log.');
	assert.equal(log[0].type, 'addnode', 'The transaction type is incorrect.');
	assert.equal(log[0].tdata.data.Text, 'Added node', 'The transaction data is incorrect.');
	$('#tree5').igTree('removeAt', '0_0');
	log = $('#tree5').igTree('transactionLog');
	assert.equal(log.length, 2, 'The transaction was not recorded in the transaction log.');
	assert.equal(log[1].type, 'removenode', 'The transaction type is incorrect.');
	assert.equal(log[1].tdata.data.Text, 'Unit testing', 'The transaction data is incorrect.');
	log = $('#tree5').igTree('option', 'dataSource').root().allTransactions();
	assert.equal(log.length, 2, 'The transaction was not recorded in the transaction log.');
	assert.equal(log[1].type, 'removenode', 'The transaction type is incorrect.');
	assert.equal(log[1].tdata.data.Text, 'Unit testing', 'The transaction data is incorrect.');
});

QUnit.test(testId_11, function (assert) {
	assert.expect(13);

	var data = [{
			Text: 'a',
			Children: [
				{ Text: 'b' }
			]
		}],
		tree = $('<div></div>').appendTo(document.body),
		node;
	tree.igTree({
		dataSource: data,
		loadOnDemand: true,
		dragAndDrop: true,
		checkboxMode: "triState",
		bindings: {
			textKey: 'Text',
			childDataProperty: 'Children'
		}
	});
	assert.equal(tree.find('li[data-role=node]').length, 1, "There is more than one node in the tree and one in the datasource");
	node = tree.igTree('nodeByPath', 0);
	assert.equal(tree.find('li[data-role=node] ul').attr('data-populated'), 'false', "The data-populated attribute is missing.");
	tree.igTree("toggleCheckstate", node);
	assert.ok(tree.igTree("isChecked", node), "The node is not checked");
	tree.igTree('addNode', { Text: 'b' }, node);
	assert.equal(tree.find('li[data-role=node]').length, 2, "There are more than two nodes in the tree and two in the datasource after add");
	tree.igTree('expand', node);
	assert.equal(tree.find('li[data-role=node] ul').attr('data-populated'), 'true', "The data-populated attribute is missing.");
	assert.equal(tree.find('li[data-role=node]').length, 3, "There are more than three nodes in the tree and three in the datasource after add and expand with LOD.");
	node = tree.igTree('nodeByPath', '0_0');
	tree.igTree('addNode', { Text: 'b' }, node);
	tree.igTree('addNode', { Text: 'b' }, node);
	assert.equal(tree.igTree("checkedNodes").length, 5, "The nodes weren't rendered as checked");
	node = tree.igTree('nodeByPath', '0_0_0');
	tree.igTree("toggleCheckstate", node);
	tree.igTree("removeAt", '0_0_1');
	node = tree.igTree('nodeByPath', '0');
	assert.ok(!tree.igTree("isChecked", node), "The node is still checked");
	assert.equal(tree.igTree("partiallyCheckedNodes").length, 1, "The root node is not partially checked");
	assert.equal(tree.igTree("partiallyCheckedNodes")[0].path, '0', "The root node is not partially checked");
	node = tree.igTree('nodeByPath', '0_0');
	assert.ok(!tree.igTree("isChecked", node), "The node is still checked");
	tree.igTree('addNode', { Text: 'b' }, node);
	tree.igTree('addNode', null, node);
	node = tree.igTree('nodeByPath', '0_0_0');
	tree.igTree("toggleCheckstate", node);
	tree.igTree("removeAt", '0_0_1');
	node = tree.igTree('nodeByPath', '0');
	assert.ok(tree.igTree("isChecked", node), "The node is not checked after all remaining children are checked");
	node = tree.igTree('nodeByPath', '0_0');
	assert.ok(tree.igTree("isChecked", node), "The node is not checked after all remaining children are checked");
});
/* ***************** END igTree add/remove nodes ***************** */