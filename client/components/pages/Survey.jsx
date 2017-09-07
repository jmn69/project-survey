import React from 'react';
import { connect } from 'react-redux';
import universal from 'react-universal-component';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import { getQuestionComponentNameByType } from '../../utils';
import styles from '../../css/Survey.css';

const loading = () => {
    return (
        <div className={styles.spinner}>
            <div className={styles.bounce1}></div>
            <div className={styles.bounce2}></div>
            <div className={styles.bounce3}></div>
        </div>
    );
};

const UniversalComponent = universal(
    props => import(`../questions/${props.component}`),
    {
        loading: loading,
        error: () => <div>PAGE NOT FOUND - 404</div>
    }
);

export class Survey extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { survey } = this.props;
        let surveys = null;
        if (survey && survey.question) {
            surveys = questions.map(question => {
                const componentName = getQuestionComponentNameByType(question.type);
                return (
                    <Row key={question.id} className={`justify-content-center`}>
                        <Col md="6">
                            <UniversalComponent
                                component={componentName}
                            />
                        </Col>
                    </Row>
                );
            });
        }

        return (
            <Row className={`${styles.root} justify-content-center`}>
                <Col xs="12" sm="10" md="8">
                    {surveys}
                </Col>
            </Row>
        );
    }
}


export const mapStateToProps = (state, ownProps) => {
    return {
        survey: {
            questions: [
                {
                    id: 1,
                    type: 'RADIOSINGLE',
                    data: {
                        question: "A quel point isco est un boulet ?",
                        answers: [
                            { id: 1, text: "Pas du tout" },
                            { id: 2, text: "Un peu" },
                            { id: 3, text: "Moyennement" },
                            { id: 4, text: "Beaucoup" },
                            { id: 5, text: "Beaucoup trop..." },
                            { id: 6, text: "Je sais pas" }
                        ]
                    }
                },
                {
                    id: 2,
                    type: 'RADIOMULTIPLE',
                    data: {
                        question: "Pour vous ces langages ils sont :",
                        answers: [
                            { id: 1, text: "Nul à chier" },
                            { id: 2, text: "Ca à l'air bien mais je m'en cogne les cacahuètes" },
                            { id: 3, text: "Un langage comme un autre" },
                            { id: 4, text: "Trop cool" },
                            { id: 5, text: "Turfu 1000" }
                        ],
                        categories: [
                            { id: 1, text: "Javascript" },
                            { id: 2, text: "C#" },
                            { id: 3, text: "Python" },
                            { id: 4, text: "C/C++" },
                            { id: 5, text: "Java" }
                        ]
                    }
                },
                {
                    id: 3,
                    type: 'CHECKSINGLE',
                    data: {
                        question: "Quels langages maitrisez-vous ?",
                        answers: [
                            { id: 1, text: "Javascript" },
                            { id: 2, text: "C#" },
                            { id: 3, text: "Python" },
                            { id: 4, text: "C/C++" },
                            { id: 5, text: "Java" }
                        ]
                    }
                },
                {
                    id: 4,
                    type: 'CHECKMULTIPLE',
                    data: {
                        question: "Cochez les compétences que vous avez déjà experimenté dans les langages suivant :",
                        answers: [
                            { id: 1, text: "MVVM" },
                            { id: 2, text: "API REST" },
                            { id: 3, text: "CQRS" },
                            { id: 4, text: "Async development" },
                            { id: 5, text: "Unit testing" }
                        ],
                        categories: [
                            { id: 1, text: "Javascript" },
                            { id: 2, text: "C#" },
                            { id: 3, text: "Python" },
                            { id: 4, text: "C/C++" },
                            { id: 5, text: "Java" }
                        ]
                    }
                },
                {
                    id: 5,
                    type: 'INPUTSINGLE',
                    data: {
                        question: "Combien de clients sont des salariés :",
                        answers: [{ type: "number" }]
                    }
                }
            ]
        }
    }
}

export default connect(mapStateToProps)(Survey)