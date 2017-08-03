// import Chart from '../lib/chart.min';
import Chart from 'chart.js';

export default function() {

	new Chart(document.getElementById('category-chart'), {
		type: 'doughnut',
		data: {
			labels: [ 'Sandwich', 'Soft Drinks', 'Specials', 'Soup', 'Dessert', 'Pizza', 'Coffee', 'Salad' ],
			datasets: [
				{
					backgroundColor: [
						'rgb(192, 156, 220)',
						'rgb(240, 93, 109)',
						'rgb(64, 189, 173)',
						'rgb(237, 213, 116)',
						'rgb(232, 171, 171)',
						'rgb(237, 213, 116)',
						'rgb(254, 150, 99)',
						'rgb(76, 171, 112)'
					],
					data: [20, 20, 30, 10, 5, 5, 5, 5]
				}
			]
		},
		options: {
			cutoutPercentage: 70,
			legend: {
				display: false
			}
		}
	});

	new Chart(document.getElementById('product-chart'), {
		type: 'doughnut',
		data: {
			labels: [ 
				'Cheeseburger', 
				'Ciabatta with chicken', 
				'Ciabatta with tuna', 
				'Ciabatta with spinach', 
				'Sandwich with salmon', 
				'Sandwich with ham', 
				'Sandwich with broccoli', 
				'Club sandwich', 
				'Hamburger', 
				'Sprite', 
				'Pepsi'
			],
			datasets: [
				{
					backgroundColor: [
						'rgb(192, 156, 220)',
						'rgb(192, 156, 220)',
						'rgb(192, 156, 220)',
						'rgb(192, 156, 220)',
						'rgb(192, 156, 220)',
						'rgb(192, 156, 220)',
						'rgb(192, 156, 220)',
						'rgb(192, 156, 220)',
						'rgb(192, 156, 220)',
						'rgb(240, 93, 109)',
						'rgb(240, 93, 109)'
					],
					data: [ 10, 9, 9, 7, 7, 7, 6, 12, 13, 15, 5 ]
				}
			]
		},
		options: {
			cutoutPercentage: 70,
			legend: {
				display: false
			}
		}
	});

};